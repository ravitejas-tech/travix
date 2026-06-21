import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Static } from '@sinclair/typebox';
import {
  ActivityEntity,
  BudgetEstimationEntity,
  ItineraryDayEntity,
  TripEntity,
} from '@travix/db';
import { GenerationContext } from '@travix/shared';
import { GenerationService } from 'api/modules/generation/services';
import { ItineraryDayResponse } from 'api/modules/itinerary/dtos/responses';
import { DataSource, EntityManager } from 'typeorm';
import { RegenerateDayCommand } from '../impl/regenerate-day.command';

@CommandHandler(RegenerateDayCommand)
export class RegenerateDayHandler implements ICommandHandler<RegenerateDayCommand> {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    @Inject(GenerationService)
    private readonly generationService: GenerationService,
  ) {}

  async execute(
    command: RegenerateDayCommand,
  ): Promise<Static<typeof ItineraryDayResponse>> {
    const { userId, tripId, dayId, instructions } = command;
    const manager = this.datasource.manager;

    const trip = await manager.findOne(TripEntity, {
      where: { id: tripId, userId },
      relations: ['city', 'city.country'],
    });
    if (!trip) {
      throw new NotFoundException('trip not found');
    }

    const day = await manager.findOne(ItineraryDayEntity, {
      where: { id: dayId, tripId },
    });
    if (!day) {
      throw new NotFoundException('itinerary day not found');
    }

    const generated = await this.generationService.regenerateDay(
      this.buildContext(trip, await this.resolveCurrencyCode(manager, tripId)),
      day.dayNumber,
      instructions,
    );

    const activities = await manager.transaction(async (trx) => {
      const merged = await this.replaceGeneratedActivities(
        trx,
        day,
        generated.activities,
      );
      day.summary = generated.summary ?? day.summary;
      await trx.save(day);
      return merged;
    });

    return {
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
    };
  }

  private async replaceGeneratedActivities(
    manager: EntityManager,
    day: ItineraryDayEntity,
    generated: {
      name: string;
      description: string | null;
      type: ActivityEntity['type'];
    }[],
  ): Promise<ActivityEntity[]> {
    await manager.softDelete(ActivityEntity, {
      itineraryDayId: day.id,
      isCustom: false,
    });

    const custom = await manager.find(ActivityEntity, {
      where: { itineraryDayId: day.id, isCustom: true },
    });
    let sortOrder = custom.length;

    const created = await manager.save(
      generated.map((activity) =>
        manager.create(ActivityEntity, {
          itineraryDayId: day.id,
          name: activity.name,
          description: activity.description,
          type: activity.type,
          sortOrder: sortOrder++,
          isCustom: false,
        }),
      ),
    );

    return [...custom, ...created];
  }

  private buildContext(
    trip: TripEntity,
    currencyCode: string,
  ): GenerationContext {
    const cityName = trip.city?.name ?? 'the destination';
    const countryName = trip.city?.country?.name;
    return {
      destination: countryName ? `${cityName}, ${countryName}` : cityName,
      numberOfDays: trip.numberOfDays,
      budgetType: trip.budgetType,
      interests: trip.interests ?? [],
      currencyCode,
    };
  }

  private async resolveCurrencyCode(
    manager: EntityManager,
    tripId: string,
  ): Promise<string> {
    const budget = await manager.findOne(BudgetEstimationEntity, {
      where: { tripId },
      relations: ['currency'],
    });
    return budget?.currency?.code ?? 'USD';
  }
}
