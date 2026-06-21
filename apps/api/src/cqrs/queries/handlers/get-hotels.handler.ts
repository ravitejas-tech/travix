import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Static } from '@sinclair/typebox';
import { HotelSuggestionEntity, TripEntity } from '@travix/db';
import { HotelResponse } from 'api/modules/hotels/dtos/responses';
import { DataSource } from 'typeorm';
import { GetHotelsQuery } from '../impl/get-hotels.query';

@QueryHandler(GetHotelsQuery)
export class GetHotelsHandler implements IQueryHandler<GetHotelsQuery> {
  constructor(@InjectDataSource() private readonly datasource: DataSource) {}

  async execute(
    query: GetHotelsQuery,
  ): Promise<Static<typeof HotelResponse>[]> {
    const { userId, tripId } = query;
    const manager = this.datasource.manager;

    const owns = await manager.exists(TripEntity, {
      where: { id: tripId, userId },
    });
    if (!owns) {
      throw new NotFoundException('trip not found');
    }

    const hotels = await manager
      .createQueryBuilder(HotelSuggestionEntity, 'hotel')
      .where('hotel.tripId = :tripId', { tripId })
      .orderBy('hotel.sortOrder', 'ASC')
      .getMany();

    return hotels.map((hotel) => ({
      id: hotel.id,
      name: hotel.name,
      category: hotel.category,
      rating:
        hotel.rating !== null && hotel.rating !== undefined
          ? Number(hotel.rating)
          : null,
      description: hotel.description ?? null,
      sortOrder: hotel.sortOrder,
    }));
  }
}
