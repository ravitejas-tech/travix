import { Controller, Inject, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { Static } from '@sinclair/typebox'
import { HttpEndpoint } from '@travix/crud'
import { Builder } from '@travix/shared'
import { RegenerateHotelsCommand } from 'api/cqrs/commands/impl/regenerate-hotels.command'
import { GetHotelsQuery } from 'api/cqrs/queries/impl/get-hotels.query'
import { AuthUser } from 'api/decorators/authenticated-user.decorator'
import { JwtAuthGuard } from 'api/guards/jwt-auth.guard'
import { TripIdParam } from '../../dtos/payloads'
import { HotelsResponse } from '../../dtos/responses'

@ApiTags('Hotels')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'trips/:tripId/hotels', version: '1' })
export class V1HotelsController {
    constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus,
    ) {}

    @HttpEndpoint({
        method: 'GET',
        summary: 'List hotel suggestions for a trip',
        auth: true,
        validate: {
            request: [{ type: 'param', name: 'tripId', schema: TripIdParam }],
            response: { schema: HotelsResponse },
        },
    })
    async list(tripId: string, @AuthUser('id') userId: string): Promise<Static<typeof HotelsResponse>> {
        return this.queryBus.execute(Builder(GetHotelsQuery, { userId, tripId }).build())
    }

    @HttpEndpoint({
        method: 'POST',
        path: 'regenerate',
        summary: 'Regenerate hotel suggestions for a trip',
        auth: true,
        validate: {
            request: [{ type: 'param', name: 'tripId', schema: TripIdParam }],
            response: { schema: HotelsResponse },
        },
    })
    async regenerate(tripId: string, @AuthUser('id') userId: string): Promise<Static<typeof HotelsResponse>> {
        return this.commandBus.execute(Builder(RegenerateHotelsCommand, { userId, tripId }).build())
    }
}
