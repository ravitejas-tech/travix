import { Query } from '@nestjs/cqrs'
import { Static } from '@sinclair/typebox'
import { TripDetailResponse } from 'api/modules/trips/dtos/responses'

export class GetTripQuery extends Query<Static<typeof TripDetailResponse>> {
    public readonly userId: string
    public readonly tripId: string
}
