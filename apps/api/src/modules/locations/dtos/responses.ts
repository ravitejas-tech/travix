import { Type } from '@sinclair/typebox'
import { Nullable, PaginatedResponse } from '@travix/crud'

export const CityResponse = Type.Object({
    id: Type.String(),
    name: Type.String(),
    stateName: Nullable(Type.String()),
    countryId: Type.String(),
    countryName: Type.String(),
    countryCode: Type.String(),
})

export const PaginatedCitiesResponse = PaginatedResponse(CityResponse)
