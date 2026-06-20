import { Query } from '@nestjs/cqrs'
import { Static } from '@sinclair/typebox'
import { PaginatedCitiesResponse } from 'api/modules/locations/dtos/responses'

export class SearchCitiesQuery extends Query<Static<typeof PaginatedCitiesResponse>> {
    public readonly search?: string
    public readonly page: number
    public readonly limit: number
}
