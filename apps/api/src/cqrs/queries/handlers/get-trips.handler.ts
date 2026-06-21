import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Static } from '@sinclair/typebox';
import { paginateQueryBuilder } from '@travix/crud';
import { TripEntity } from '@travix/db';
import { TripSummaryResponse } from 'api/modules/trips/dtos/responses';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { GetTripsQuery } from '../impl/get-trips.query';

@QueryHandler(GetTripsQuery)
export class GetTripsHandler implements IQueryHandler<GetTripsQuery> {
  constructor(@InjectDataSource() private readonly datasource: DataSource) {}

  async execute(query: GetTripsQuery) {
    const { userId, page, limit, search, sort } = query;

    const queryBuilder = this.datasource.manager
      .createQueryBuilder(TripEntity, 'trip')
      .innerJoinAndSelect('trip.city', 'city')
      .innerJoinAndSelect('city.country', 'country')
      .leftJoinAndSelect('trip.budget', 'budget')
      .where('trip.userId = :userId', { userId });

    this.applySearch(queryBuilder, search);
    this.applySort(queryBuilder, sort);

    const { items, meta, links } = await paginateQueryBuilder(queryBuilder, {
      page,
      limit,
    });

    return {
      items: items.map((trip) => this.toSummary(trip)),
      meta,
      links,
    };
  }

  private applySearch(
    queryBuilder: SelectQueryBuilder<TripEntity>,
    search?: string,
  ): void {
    const term = search?.trim();
    if (term) {
      queryBuilder.andWhere(
        '(city.name LIKE :term OR country.name LIKE :term)',
        { term: `%${term}%` },
      );
    }
  }

  private applySort(
    queryBuilder: SelectQueryBuilder<TripEntity>,
    sort?: GetTripsQuery['sort'],
  ): void {
    if (sort === 'budget_high') {
      queryBuilder.orderBy('budget.total', 'DESC');
    } else if (sort === 'budget_low') {
      queryBuilder.orderBy('budget.total', 'ASC');
    } else {
      queryBuilder.orderBy('trip.createdAt', 'DESC');
    }
    queryBuilder.addOrderBy('trip.createdAt', 'DESC');
  }

  private toSummary(trip: TripEntity): Static<typeof TripSummaryResponse> {
    return {
      id: trip.id,
      destination: {
        cityId: trip.cityId,
        cityName: trip.city?.name ?? '',
        countryName: trip.city?.country?.name ?? '',
      },
      numberOfDays: trip.numberOfDays,
      budgetType: trip.budgetType,
      interests: trip.interests ?? [],
      status: trip.status,
      total: trip.budget ? Number(trip.budget.total) : null,
      createdAt: trip.createdAt.toISOString(),
    };
  }
}
