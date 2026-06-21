import { Controller, Inject, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Static } from '@sinclair/typebox';
import { HttpEndpoint } from '@travix/crud';
import { Builder } from '@travix/shared';
import { AddActivityCommand } from 'api/cqrs/commands/impl/add-activity.command';
import { RegenerateDayCommand } from 'api/cqrs/commands/impl/regenerate-day.command';
import { RemoveActivityCommand } from 'api/cqrs/commands/impl/remove-activity.command';
import { AuthUser } from 'api/decorators/authenticated-user.decorator';
import { JwtAuthGuard } from 'api/guards/jwt-auth.guard';
import {
  ActivityIdParam,
  AddActivityPayload,
  DayIdParam,
  RegenerateDayPayload,
  TripIdParam,
} from '../../dtos/payloads';
import { ActivityResponse, ItineraryDayResponse } from '../../dtos/responses';

@ApiTags('Itinerary')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'trips/:tripId', version: '1' })
export class V1ItineraryController {
  constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

  @HttpEndpoint({
    method: 'POST',
    path: 'days/:dayId/regenerate',
    summary: 'Regenerate an itinerary day',
    auth: true,
    validate: {
      request: [
        { type: 'param', name: 'tripId', schema: TripIdParam },
        { type: 'param', name: 'dayId', schema: DayIdParam },
        { type: 'body', schema: RegenerateDayPayload },
      ],
      response: { schema: ItineraryDayResponse },
    },
  })
  async regenerateDay(
    tripId: string,
    dayId: string,
    body: Static<typeof RegenerateDayPayload>,
    @AuthUser('id') userId: string,
  ): Promise<Static<typeof ItineraryDayResponse>> {
    return this.commandBus.execute(
      Builder(RegenerateDayCommand, {
        userId,
        tripId,
        dayId,
        instructions: body.instructions,
      }).build(),
    );
  }

  @HttpEndpoint({
    method: 'POST',
    path: 'days/:dayId/activities',
    summary: 'Add a custom activity to a day',
    auth: true,
    responseCode: 201,
    validate: {
      request: [
        { type: 'param', name: 'tripId', schema: TripIdParam },
        { type: 'param', name: 'dayId', schema: DayIdParam },
        { type: 'body', schema: AddActivityPayload },
      ],
      response: { schema: ActivityResponse, responseCode: 201 },
    },
  })
  async addActivity(
    tripId: string,
    dayId: string,
    body: Static<typeof AddActivityPayload>,
    @AuthUser('id') userId: string,
  ): Promise<Static<typeof ActivityResponse>> {
    return this.commandBus.execute(
      Builder(AddActivityCommand, {
        userId,
        tripId,
        dayId,
        payload: body,
      }).build(),
    );
  }

  @HttpEndpoint({
    method: 'DELETE',
    path: 'days/:dayId/activities/:activityId',
    summary: 'Remove an activity from a day',
    auth: true,
    responseCode: 204,
    validate: {
      request: [
        { type: 'param', name: 'tripId', schema: TripIdParam },
        { type: 'param', name: 'dayId', schema: DayIdParam },
        { type: 'param', name: 'activityId', schema: ActivityIdParam },
      ],
    },
  })
  async removeActivity(
    tripId: string,
    dayId: string,
    activityId: string,
    @AuthUser('id') userId: string,
  ): Promise<void> {
    await this.commandBus.execute(
      Builder(RemoveActivityCommand, {
        userId,
        tripId,
        dayId,
        activityId,
      }).build(),
    );
  }
}
