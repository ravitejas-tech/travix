import { Command } from '@nestjs/cqrs';
import { Static } from '@sinclair/typebox';
import { HotelResponse } from 'api/modules/hotels/dtos/responses';

export class RegenerateHotelsCommand extends Command<
  Static<typeof HotelResponse>[]
> {
  public readonly userId: string;
  public readonly tripId: string;
}
