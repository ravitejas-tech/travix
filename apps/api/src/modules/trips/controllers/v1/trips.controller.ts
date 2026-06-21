import { Controller, Inject, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Static } from '@sinclair/typebox';
import { HttpEndpoint } from '@travix/crud';
import { Builder } from '@travix/shared';
import { CreateTripCommand } from 'api/cqrs/commands/impl/create-trip.command';
import { DeleteTripCommand } from 'api/cqrs/commands/impl/delete-trip.command';
import { GetTripQuery } from 'api/cqrs/queries/impl/get-trip.query';
import { GetTripsQuery } from 'api/cqrs/queries/impl/get-trips.query';
import { AuthUser } from 'api/decorators/authenticated-user.decorator';
import { JwtAuthGuard } from 'api/guards/jwt-auth.guard';
import {
  CreateTripPayload,
  LimitQuery,
  PageQuery,
  SearchQuery,
  SortQuery,
  TripIdParam,
  TripSort,
} from '../../dtos/payloads';
import {
  PaginatedTripsResponse,
  TripDetailResponse,
} from '../../dtos/responses';

@ApiTags('Trips')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'trips', version: '1' })
export class V1TripsController {
  constructor(
    @Inject(CommandBus) private readonly commandBus: CommandBus,
    @Inject(QueryBus) private readonly queryBus: QueryBus,
  ) {}

  @HttpEndpoint({
    method: 'POST',
    path: '',
    summary: 'Create a trip and generate its itinerary',
    auth: true,
    responseCode: 201,
    validate: {
      request: [{ type: 'body', schema: CreateTripPayload }],
      response: { schema: TripDetailResponse, responseCode: 201 },
    },
  })
  async create(
    body: Static<typeof CreateTripPayload>,
    @AuthUser('id') userId: string,
  ): Promise<Static<typeof TripDetailResponse>> {
    return this.commandBus.execute(
      Builder(CreateTripCommand, { userId, payload: body }).build(),
    );
  }

  @HttpEndpoint({
    method: 'GET',
    path: '',
    summary: 'List the authenticated user trips',
    auth: true,
    validate: {
      request: [
        {
          type: 'query',
          name: 'page',
          schema: PageQuery,
          required: false,
          coerceTypes: true,
        },
        {
          type: 'query',
          name: 'limit',
          schema: LimitQuery,
          required: false,
          coerceTypes: true,
        },
        {
          type: 'query',
          name: 'search',
          schema: SearchQuery,
          required: false,
        },
        {
          type: 'query',
          name: 'sort',
          schema: SortQuery,
          required: false,
        },
      ],
      response: { schema: PaginatedTripsResponse },
    },
  })
  async list(
    page = 1,
    limit = 20,
    search: string | undefined,
    sort: TripSort | undefined,
    @AuthUser('id') userId: string,
  ): Promise<Static<typeof PaginatedTripsResponse>> {
    return this.queryBus.execute(
      Builder(GetTripsQuery, { userId, page, limit, search, sort }).build(),
    );
  }

  @HttpEndpoint({
    method: 'GET',
    path: ':tripId',
    summary: 'Get a trip with its itinerary, budget and hotels',
    auth: true,
    validate: {
      request: [{ type: 'param', name: 'tripId', schema: TripIdParam }],
      response: { schema: TripDetailResponse },
    },
  })
  async detail(
    tripId: string,
    @AuthUser('id') userId: string,
  ): Promise<Static<typeof TripDetailResponse>> {
    return this.queryBus.execute(
      Builder(GetTripQuery, { userId, tripId }).build(),
    );
  }

  @HttpEndpoint({
    method: 'DELETE',
    path: ':tripId',
    summary: 'Delete a trip',
    auth: true,
    responseCode: 204,
    validate: {
      request: [{ type: 'param', name: 'tripId', schema: TripIdParam }],
    },
  })
  async remove(tripId: string, @AuthUser('id') userId: string): Promise<void> {
    await this.commandBus.execute(
      Builder(DeleteTripCommand, { userId, tripId }).build(),
    );
  }
}
