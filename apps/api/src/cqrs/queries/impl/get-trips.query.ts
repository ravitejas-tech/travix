import { Query } from '@nestjs/cqrs'
import { Static } from '@sinclair/typebox'
import { PaginatedTripsResponse } from 'api/modules/trips/dtos/responses'

export class GetTripsQuery extends Query<Static<typeof PaginatedTripsResponse>> {
    public readonly userId: string
    public readonly page: number
    public readonly limit: number
}
