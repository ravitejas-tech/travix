import { Query } from '@nestjs/cqrs';
import { Static } from '@sinclair/typebox';
import { HotelResponse } from 'api/modules/hotels/dtos/responses';

export class GetHotelsQuery extends Query<Static<typeof HotelResponse>[]> {
  public readonly userId: string;
  public readonly tripId: string;
}
