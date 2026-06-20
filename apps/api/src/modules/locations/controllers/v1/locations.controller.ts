import { Controller, Inject } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Static } from '@sinclair/typebox'
import { HttpEndpoint } from '@travix/crud'
import { Builder } from '@travix/shared'
import { SearchCitiesQuery } from 'api/cqrs/queries/impl/search-cities.query'
import { LimitQuery, PageQuery, SearchCitiesSearch } from '../../dtos/payloads'
import { PaginatedCitiesResponse } from '../../dtos/responses'

@ApiTags('Locations')
@Controller({ path: 'locations', version: '1' })
export class V1LocationsController {
    constructor(@Inject(QueryBus) private readonly queryBus: QueryBus) {}

    @HttpEndpoint({
        method: 'GET',
        path: 'cities',
        summary: 'Search destination cities',
        validate: {
            request: [
                { type: 'query', name: 'search', schema: SearchCitiesSearch, required: false },
                { type: 'query', name: 'page', schema: PageQuery, required: false, coerceTypes: true },
                { type: 'query', name: 'limit', schema: LimitQuery, required: false, coerceTypes: true },
            ],
            response: { schema: PaginatedCitiesResponse },
        },
    })
    async searchCities(
        search: string | undefined,
        page = 1,
        limit = 20,
    ): Promise<Static<typeof PaginatedCitiesResponse>> {
        return this.queryBus.execute(Builder(SearchCitiesQuery, { search, page, limit }).build())
    }
}
