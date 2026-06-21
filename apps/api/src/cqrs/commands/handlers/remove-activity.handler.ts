import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { ActivityEntity, ItineraryDayEntity, TripEntity } from '@travix/db';
import { DataSource } from 'typeorm';
import { RemoveActivityCommand } from '../impl/remove-activity.command';

@CommandHandler(RemoveActivityCommand)
export class RemoveActivityHandler implements ICommandHandler<RemoveActivityCommand> {
  constructor(@InjectDataSource() private readonly datasource: DataSource) {}

  async execute(command: RemoveActivityCommand): Promise<void> {
    const { userId, tripId, dayId, activityId } = command;
    const manager = this.datasource.manager;

    const owns = await manager.exists(TripEntity, {
      where: { id: tripId, userId },
    });
    if (!owns) {
      throw new NotFoundException('trip not found');
    }

    const day = await manager.findOne(ItineraryDayEntity, {
      where: { id: dayId, tripId },
    });
    if (!day) {
      throw new NotFoundException('itinerary day not found');
    }

    const activity = await manager.findOne(ActivityEntity, {
      where: { id: activityId, itineraryDayId: dayId },
    });
    if (!activity) {
      throw new NotFoundException('activity not found');
    }

    await manager.softRemove(activity);
  }
}
