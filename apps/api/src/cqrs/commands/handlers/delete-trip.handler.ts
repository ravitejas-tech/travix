import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import {
    ActivityEntity,
    BudgetEstimationEntity,
    HotelSuggestionEntity,
    ItineraryDayEntity,
    TripEntity,
} from '@travix/db'
import { DataSource, In } from 'typeorm'
import { DeleteTripCommand } from '../impl/delete-trip.command'

@CommandHandler(DeleteTripCommand)
export class DeleteTripHandler implements ICommandHandler<DeleteTripCommand> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {}

    async execute(command: DeleteTripCommand): Promise<void> {
        const { userId, tripId } = command

        await this.datasource.manager.transaction(async (manager) => {
            const trip = await manager.findOne(TripEntity, { where: { id: tripId, userId } })
            if (!trip) {
                throw new NotFoundException('trip not found')
            }

            const days = await manager.find(ItineraryDayEntity, { where: { tripId: trip.id } })
            const dayIds = days.map((day) => day.id)

            if (dayIds.length > 0) {
                await manager.softDelete(ActivityEntity, { itineraryDayId: In(dayIds) })
                await manager.softDelete(ItineraryDayEntity, { id: In(dayIds) })
            }

            await manager.softDelete(BudgetEstimationEntity, { tripId: trip.id })
            await manager.softDelete(HotelSuggestionEntity, { tripId: trip.id })
            await manager.softRemove(trip)
        })
    }
}
