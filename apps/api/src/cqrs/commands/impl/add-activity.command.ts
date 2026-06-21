import { Command } from '@nestjs/cqrs';
import { Static } from '@sinclair/typebox';
import { AddActivityPayload } from 'api/modules/itinerary/dtos/payloads';
import { ActivityResponse } from 'api/modules/itinerary/dtos/responses';

export class AddActivityCommand extends Command<
  Static<typeof ActivityResponse>
> {
  public readonly userId: string;
  public readonly tripId: string;
  public readonly dayId: string;
  public readonly payload: Static<typeof AddActivityPayload>;
}
