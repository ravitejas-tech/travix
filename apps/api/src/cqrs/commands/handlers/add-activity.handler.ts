import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import { Static } from '@sinclair/typebox'
import { ActivityEntity, ItineraryDayEntity, TripEntity } from '@travix/db'
import { ActivityResponse } from 'api/modules/itinerary/dtos/responses'
import { DataSource } from 'typeorm'
import { AddActivityCommand } from '../impl/add-activity.command'

@CommandHandler(AddActivityCommand)
export class AddActivityHandler implements ICommandHandler<AddActivityCommand> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {}

    async execute(command: AddActivityCommand): Promise<Static<typeof ActivityResponse>> {
        const { userId, tripId, dayId, payload } = command
        const manager = this.datasource.manager

        const owns = await manager.exists(TripEntity, { where: { id: tripId, userId } })
        if (!owns) {
            throw new NotFoundException('trip not found')
        }

        const day = await manager.findOne(ItineraryDayEntity, { where: { id: dayId, tripId } })
        if (!day) {
            throw new NotFoundException('itinerary day not found')
        }

        const count = await manager.count(ActivityEntity, { where: { itineraryDayId: dayId } })

        const activity = await manager.save(
            manager.create(ActivityEntity, {
                itineraryDayId: dayId,
                name: payload.name,
                description: payload.description,
                type: payload.type,
                sortOrder: count,
                isCustom: true,
            }),
        )

        return {
            id: activity.id,
            name: activity.name,
            description: activity.description ?? null,
            type: activity.type,
            sortOrder: activity.sortOrder,
            isCustom: activity.isCustom,
        }
    }
}
