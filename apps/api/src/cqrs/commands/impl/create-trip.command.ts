import { Command } from '@nestjs/cqrs';
import { Static } from '@sinclair/typebox';
import { CreateTripPayload } from 'api/modules/trips/dtos/payloads';
import { TripDetailResponse } from 'api/modules/trips/dtos/responses';

export class CreateTripCommand extends Command<
  Static<typeof TripDetailResponse>
> {
  public readonly userId: string;
  public readonly payload: Static<typeof CreateTripPayload>;
}
