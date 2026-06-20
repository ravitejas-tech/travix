import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import { Static } from '@sinclair/typebox'
import { paginateQueryBuilder } from '@travix/crud'
import { BudgetEstimationEntity, TripEntity } from '@travix/db'
import { TripSummaryResponse } from 'api/modules/trips/dtos/responses'
import { DataSource, In } from 'typeorm'
import { GetTripsQuery } from '../impl/get-trips.query'

@QueryHandler(GetTripsQuery)
export class GetTripsHandler implements IQueryHandler<GetTripsQuery> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {}

    async execute(query: GetTripsQuery) {
        const { userId, page, limit } = query

        const queryBuilder = this.datasource.manager
            .createQueryBuilder(TripEntity, 'trip')
            .innerJoinAndSelect('trip.city', 'city')
            .innerJoinAndSelect('city.country', 'country')
            .where('trip.userId = :userId', { userId })
            .orderBy('trip.createdAt', 'DESC')

        const { items, meta, links } = await paginateQueryBuilder(queryBuilder, { page, limit })

        const totals = await this.loadTotals(items.map((trip) => trip.id))

        return {
            items: items.map((trip) => this.toSummary(trip, totals.get(trip.id) ?? null)),
            meta,
            links,
        }
    }

    private toSummary(trip: TripEntity, total: number | null): Static<typeof TripSummaryResponse> {
        return {
            id: trip.id,
            destination: {
                cityId: trip.cityId,
                cityName: trip.city?.name ?? '',
                countryName: trip.city?.country?.name ?? '',
            },
            numberOfDays: trip.numberOfDays,
            budgetType: trip.budgetType,
            interests: trip.interests ?? [],
            status: trip.status,
            total,
            createdAt: trip.createdAt.toISOString(),
        }
    }

    private async loadTotals(tripIds: string[]): Promise<Map<string, number>> {
        if (tripIds.length === 0) {
            return new Map()
        }

        const budgets = await this.datasource.manager.find(BudgetEstimationEntity, {
            where: { tripId: In(tripIds) },
        })

        return new Map(budgets.map((budget) => [budget.tripId, Number(budget.total)]))
    }
}
