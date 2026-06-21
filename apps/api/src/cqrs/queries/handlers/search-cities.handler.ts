import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { paginateQueryBuilder } from '@travix/crud';
import { CityEntity } from '@travix/db';
import { DataSource } from 'typeorm';
import { SearchCitiesQuery } from '../impl/search-cities.query';

@QueryHandler(SearchCitiesQuery)
export class SearchCitiesHandler implements IQueryHandler<SearchCitiesQuery> {
  constructor(@InjectDataSource() private readonly datasource: DataSource) {}

  async execute(query: SearchCitiesQuery) {
    const { search, page, limit } = query;

    const queryBuilder = this.datasource.manager
      .createQueryBuilder(CityEntity, 'city')
      .innerJoinAndSelect('city.country', 'country')
      .leftJoinAndSelect('city.state', 'state')
      .orderBy('city.name', 'ASC');

    if (search) {
      queryBuilder.where('city.name LIKE :search', { search: `%${search}%` });
    }

    const { items, meta, links } = await paginateQueryBuilder(queryBuilder, {
      page,
      limit,
    });

    return {
      items: items.map((city) => ({
        id: city.id,
        name: city.name,
        stateName: city.state?.name ?? null,
        countryId: city.countryId,
        countryName: city.country.name,
        countryCode: city.country.code,
      })),
      meta,
      links,
    };
  }
}
