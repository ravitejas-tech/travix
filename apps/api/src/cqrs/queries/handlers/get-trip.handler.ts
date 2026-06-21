import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Static } from '@sinclair/typebox';
import {
  ActivityEntity,
  HotelSuggestionEntity,
  ItineraryDayEntity,
  TripEntity,
} from '@travix/db';
import { ItineraryDayResponse } from 'api/modules/itinerary/dtos/responses';
import { HotelResponse } from 'api/modules/hotels/dtos/responses';
import { DataSource } from 'typeorm';
import { GetTripQuery } from '../impl/get-trip.query';

@QueryHandler(GetTripQuery)
export class GetTripHandler implements IQueryHandler<GetTripQuery> {
  constructor(@InjectDataSource() private readonly datasource: DataSource) {}

  async execute(query: GetTripQuery) {
    const { userId, tripId } = query;
    const manager = this.datasource.manager;

    const trip = await manager
      .createQueryBuilder(TripEntity, 'trip')
      .innerJoinAndSelect('trip.city', 'city')
      .innerJoinAndSelect('city.country', 'country')
      .leftJoinAndSelect('trip.budget', 'budget')
      .leftJoinAndSelect('budget.currency', 'currency')
      .where('trip.id = :tripId', { tripId })
      .andWhere('trip.userId = :userId', { userId })
      .getOne();

    if (!trip) {
      throw new NotFoundException('trip not found');
    }

    const [days, hotels] = await Promise.all([
      manager
        .createQueryBuilder(ItineraryDayEntity, 'day')
        .leftJoinAndSelect('day.activities', 'activity')
        .where('day.tripId = :tripId', { tripId })
        .orderBy('day.dayNumber', 'ASC')
        .addOrderBy('activity.sortOrder', 'ASC')
        .getMany(),
      manager
        .createQueryBuilder(HotelSuggestionEntity, 'hotel')
        .where('hotel.tripId = :tripId', { tripId })
        .orderBy('hotel.sortOrder', 'ASC')
        .getMany(),
    ]);

    const { budget } = trip;

    return {
      id: trip.id,
      destination: {
        cityId: trip.cityId,
        cityName: trip.city.name,
        countryName: trip.city.country.name,
      },
      numberOfDays: trip.numberOfDays,
      budgetType: trip.budgetType,
      interests: trip.interests ?? [],
      status: trip.status,
      total: budget ? Number(budget.total) : null,
      createdAt: trip.createdAt.toISOString(),
      days: days.map((day) => this.toDay(day)),
      budget: budget?.currency
        ? {
            flights: this.toNumber(budget.flights),
            accommodation: this.toNumber(budget.accommodation),
            food: this.toNumber(budget.food),
            activities: this.toNumber(budget.activities),
            total: Number(budget.total),
            currencyCode: budget.currency.code,
            currencySymbol: budget.currency.symbol,
          }
        : null,
      hotels: hotels.map((hotel) => this.toHotel(hotel)),
    };
  }

  private toDay(day: ItineraryDayEntity): Static<typeof ItineraryDayResponse> {
    return {
      id: day.id,
      dayNumber: day.dayNumber,
      summary: day.summary ?? null,
      activities: (day.activities ?? []).map((activity: ActivityEntity) => ({
        id: activity.id,
        name: activity.name,
        description: activity.description ?? null,
        type: activity.type,
        sortOrder: activity.sortOrder,
        isCustom: activity.isCustom,
      })),
    };
  }

  private toHotel(hotel: HotelSuggestionEntity): Static<typeof HotelResponse> {
    return {
      id: hotel.id,
      name: hotel.name,
      category: hotel.category,
      rating: this.toNumber(hotel.rating),
      description: hotel.description ?? null,
      sortOrder: hotel.sortOrder,
    };
  }

  private toNumber(value: number | null | undefined): number | null {
    return value !== null && value !== undefined ? Number(value) : null;
  }
}
