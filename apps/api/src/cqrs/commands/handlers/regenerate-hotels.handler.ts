import { Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import { Static } from '@sinclair/typebox'
import { BudgetEstimationEntity, HotelSuggestionEntity, TripEntity } from '@travix/db'
import { GenerationContext } from '@travix/shared'
import { GenerationService } from 'api/modules/generation/services'
import { HotelResponse } from 'api/modules/hotels/dtos/responses'
import { DataSource, EntityManager } from 'typeorm'
import { RegenerateHotelsCommand } from '../impl/regenerate-hotels.command'

@CommandHandler(RegenerateHotelsCommand)
export class RegenerateHotelsHandler implements ICommandHandler<RegenerateHotelsCommand> {
    constructor(
        @InjectDataSource() private readonly datasource: DataSource,
        @Inject(GenerationService) private readonly generationService: GenerationService,
    ) {}

    async execute(command: RegenerateHotelsCommand): Promise<Static<typeof HotelResponse>[]> {
        const { userId, tripId } = command
        const manager = this.datasource.manager

        const trip = await manager.findOne(TripEntity, {
            where: { id: tripId, userId },
            relations: ['city', 'city.country'],
        })
        if (!trip) {
            throw new NotFoundException('trip not found')
        }

        const currencyCode = await this.resolveCurrencyCode(manager, tripId)
        const generated = await this.generationService.generateHotels(this.buildContext(trip, currencyCode))

        const hotels = await manager.transaction(async (trx) => {
            await trx.softDelete(HotelSuggestionEntity, { tripId })
            return trx.save(
                generated.map((hotel, index) =>
                    trx.create(HotelSuggestionEntity, {
                        tripId,
                        name: hotel.name,
                        category: hotel.category,
                        rating: hotel.rating,
                        description: hotel.description,
                        sortOrder: index,
                    }),
                ),
            )
        })

        return hotels.map((hotel) => ({
            id: hotel.id,
            name: hotel.name,
            category: hotel.category,
            rating: hotel.rating !== null && hotel.rating !== undefined ? Number(hotel.rating) : null,
            description: hotel.description ?? null,
            sortOrder: hotel.sortOrder,
        }))
    }

    private buildContext(trip: TripEntity, currencyCode: string): GenerationContext {
        const cityName = trip.city?.name ?? 'the destination'
        const countryName = trip.city?.country?.name
        return {
            destination: countryName ? `${cityName}, ${countryName}` : cityName,
            numberOfDays: trip.numberOfDays,
            budgetType: trip.budgetType,
            interests: trip.interests ?? [],
            currencyCode,
        }
    }

    private async resolveCurrencyCode(manager: EntityManager, tripId: string): Promise<string> {
        const budget = await manager.findOne(BudgetEstimationEntity, { where: { tripId }, relations: ['currency'] })
        return budget?.currency?.code ?? 'USD'
    }
}
