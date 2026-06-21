import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ActivityEntity,
  BudgetEstimationEntity,
  CityEntity,
  CurrencyEntity,
  HotelSuggestionEntity,
  ItineraryDayEntity,
  TripEntity,
} from '@travix/db';
import { GeneratedTrip, TripStatus } from '@travix/shared';
import { GenerationService } from 'api/modules/generation/services';
import { DataSource, EntityManager } from 'typeorm';
import { CreateTripCommand } from '../impl/create-trip.command';

interface PersistedTrip {
  trip: TripEntity;
  days: { day: ItineraryDayEntity; activities: ActivityEntity[] }[];
  budget: BudgetEstimationEntity;
  hotels: HotelSuggestionEntity[];
}

@CommandHandler(CreateTripCommand)
export class CreateTripHandler implements ICommandHandler<CreateTripCommand> {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    @Inject(GenerationService)
    private readonly generationService: GenerationService,
  ) {}

  async execute(command: CreateTripCommand) {
    const { payload } = command;
    const currencyCode = payload.currencyCode ?? 'USD';

    const [city, currency, userLocationCity] = await Promise.all([
      this.resolveCity(this.datasource.manager, payload.cityId),
      this.resolveCurrency(this.datasource.manager, currencyCode),
      payload.userLocationId
        ? this.resolveCity(this.datasource.manager, payload.userLocationId)
        : Promise.resolve(null),
    ]);

    const userLocationName = userLocationCity
      ? userLocationCity.country
        ? `${userLocationCity.name}, ${userLocationCity.country.name}`
        : userLocationCity.name
      : '';

    const generated = await this.generationService.generateTrip({
      userLocation: userLocationName,
      destination: city.country
        ? `${city.name}, ${city.country.name}`
        : city.name,
      numberOfDays: payload.numberOfDays,
      budgetType: payload.budgetType,
      interests: payload.interests,
      currencyCode: currency.code,
    });

    const persisted = await this.datasource.manager.transaction((manager) =>
      this.persistTrip(manager, command, currency, generated),
    );

    persisted.trip.city = city;
    persisted.trip.userLocation = userLocationCity;
    return this.buildDetail(persisted, currency);
  }

  private async resolveCity(
    manager: EntityManager,
    cityId: string,
  ): Promise<CityEntity> {
    const city = await manager.findOne(CityEntity, {
      where: { id: cityId },
      relations: ['country'],
    });
    if (!city) {
      throw new BadRequestException('destination city not found');
    }
    return city;
  }

  private async resolveCurrency(
    manager: EntityManager,
    code: string,
  ): Promise<CurrencyEntity> {
    const currency = await manager.findOne(CurrencyEntity, { where: { code } });
    if (!currency) {
      throw new BadRequestException(`unsupported currency: ${code}`);
    }
    return currency;
  }

  private async persistTrip(
    manager: EntityManager,
    command: CreateTripCommand,
    currency: CurrencyEntity,
    generated: GeneratedTrip,
  ): Promise<PersistedTrip> {
    const { userId, payload } = command;

    const trip = await manager.save(
      manager.create(TripEntity, {
        userId,
        cityId: payload.cityId,
        numberOfDays: payload.numberOfDays,
        budgetType: payload.budgetType,
        interests: payload.interests,
        userLocationId: payload.userLocationId || null,
        status: TripStatus.ACTIVE,
      }),
    );

    const days: PersistedTrip['days'] = [];
    for (const day of generated.days) {
      const savedDay = await manager.save(
        manager.create(ItineraryDayEntity, {
          tripId: trip.id,
          dayNumber: day.dayNumber,
          summary: day.summary,
        }),
      );

      const activities = await manager.save(
        day.activities.map((activity, index) =>
          manager.create(ActivityEntity, {
            itineraryDayId: savedDay.id,
            name: activity.name,
            description: activity.description,
            type: activity.type,
            sortOrder: index,
            isCustom: false,
          }),
        ),
      );

      days.push({ day: savedDay, activities });
    }

    const budget = await manager.save(
      manager.create(BudgetEstimationEntity, {
        tripId: trip.id,
        currencyId: currency.id,
        flights: generated.budget.flights,
        flightsDescription: generated.budget.flightsDescription,
        accommodation: generated.budget.accommodation,
        accommodationDescription: generated.budget.accommodationDescription,
        food: generated.budget.food,
        foodDescription: generated.budget.foodDescription,
        activities: generated.budget.activities,
        activitiesDescription: generated.budget.activitiesDescription,
        total: generated.budget.total,
      }),
    );

    const hotels = await manager.save(
      generated.hotels.map((hotel, index) =>
        manager.create(HotelSuggestionEntity, {
          tripId: trip.id,
          name: hotel.name,
          category: hotel.category,
          rating: hotel.rating,
          description: hotel.description,
          sortOrder: index,
        }),
      ),
    );

    return { trip, days, budget, hotels };
  }

  private buildDetail(persisted: PersistedTrip, currency: CurrencyEntity) {
    const { trip, days, budget, hotels } = persisted;
    return {
      id: trip.id,
      destination: {
        cityId: trip.cityId,
        cityName: trip.city?.name ?? '',
        countryName: trip.city?.country?.name ?? '',
      },
      userLocation: trip.userLocation
        ? {
            cityId: trip.userLocationId!,
            cityName: trip.userLocation.name,
            countryName: trip.userLocation.country?.name ?? '',
          }
        : null,
      numberOfDays: trip.numberOfDays,
      budgetType: trip.budgetType,
      interests: trip.interests ?? [],
      status: trip.status,
      total: Number(budget.total),
      createdAt: trip.createdAt.toISOString(),
      days: days.map(({ day, activities }) => ({
        id: day.id,
        dayNumber: day.dayNumber,
        summary: day.summary ?? null,
        activities: activities.map((activity) => ({
          id: activity.id,
          name: activity.name,
          description: activity.description ?? null,
          type: activity.type,
          sortOrder: activity.sortOrder,
          isCustom: activity.isCustom,
        })),
      })),
      budget: {
        flights: this.toNumber(budget.flights),
        flightsDescription: budget.flightsDescription,
        accommodation: this.toNumber(budget.accommodation),
        accommodationDescription: budget.accommodationDescription,
        food: this.toNumber(budget.food),
        foodDescription: budget.foodDescription,
        activities: this.toNumber(budget.activities),
        activitiesDescription: budget.activitiesDescription,
        total: Number(budget.total),
        currencyCode: currency.code,
        currencySymbol: currency.symbol,
      },
      hotels: hotels
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((hotel) => ({
          id: hotel.id,
          name: hotel.name,
          category: hotel.category,
          rating: this.toNumber(hotel.rating),
          description: hotel.description ?? null,
          sortOrder: hotel.sortOrder,
        })),
    };
  }

  private toNumber(value: number | null | undefined): number | null {
    return value !== null && value !== undefined ? Number(value) : null;
  }
}
