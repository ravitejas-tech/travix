import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { paginateQueryBuilder } from '@travix/crud';
import { CityEntity } from '@travix/db';
import { MAX_PAGE_SIZE } from '@travix/shared';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { SearchCitiesQuery } from '../impl/search-cities.query';

@QueryHandler(SearchCitiesQuery)
export class SearchCitiesHandler implements IQueryHandler<SearchCitiesQuery> {
  // Max candidate rows pulled from each full-text branch before joining/ranking.
  // Bounded so a broad term (e.g. a country) can never scan the whole table.
  private static readonly CANDIDATE_LIMIT = MAX_PAGE_SIZE;

  constructor(@InjectDataSource() private readonly datasource: DataSource) {}

  async execute(query: SearchCitiesQuery) {
    const { search, page, limit } = query;

    const queryBuilder = this.datasource.manager
      .createQueryBuilder(CityEntity, 'city')
      .innerJoinAndSelect('city.country', 'country')
      .leftJoinAndSelect('city.state', 'state');

    this.applySearch(queryBuilder, search);

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

  private applySearch(
    queryBuilder: SelectQueryBuilder<CityEntity>,
    search?: string,
  ): void {
    const booleanSearch = this.toBooleanSearch(search);

    if (!booleanSearch) {
      queryBuilder.orderBy('city.name', 'ASC');
      return;
    }

    // Each branch hits its own FULLTEXT index independently, then we resolve the
    // matched city ids. OR-ing MATCH() across the joined tables in one WHERE
    // can't use the indexes and forces a full table scan, so we UNION instead.
    const limit = SearchCitiesHandler.CANDIDATE_LIMIT;
    const candidateIds = `
      city.id IN (
        SELECT id FROM (
          (SELECT id FROM cities WHERE MATCH(name) AGAINST (:search IN BOOLEAN MODE) LIMIT ${limit})
          UNION
          (SELECT id FROM cities WHERE stateId IN (
            SELECT id FROM states WHERE MATCH(name) AGAINST (:search IN BOOLEAN MODE)
          ) LIMIT ${limit})
          UNION
          (SELECT id FROM cities WHERE countryId IN (
            SELECT id FROM countries WHERE MATCH(name) AGAINST (:search IN BOOLEAN MODE)
          ) LIMIT ${limit})
        ) AS candidates
      )`;

    const prefix = `${this.escapeLike(search!.trim())}%`;

    queryBuilder
      .where(candidateIds, { search: booleanSearch, prefix })
      // Exact name first, then names starting with the term, then full-text
      // relevance (city matches outrank state/country matches), then A→Z.
      .orderBy('city.name LIKE :prefix', 'DESC')
      .addOrderBy('MATCH(city.name) AGAINST (:search IN BOOLEAN MODE)', 'DESC')
      .addOrderBy('city.name', 'ASC');
  }

  private escapeLike(value: string): string {
    return value.replace(/[\\%_]/g, (char) => `\\${char}`);
  }

  // Turn a free-text query into a MySQL boolean-mode expression with prefix
  // matching, e.g. "new yor" -> "+new* +yor*". Operator characters are
  // stripped so user input can never break the query syntax.
  private toBooleanSearch(search?: string): string {
    if (!search) {
      return '';
    }

    return search
      .trim()
      .split(/\s+/)
      .map((token) => token.replace(/[+\-><()~*"@]/g, ''))
      .filter(Boolean)
      .map((token) => `+${token}*`)
      .join(' ');
  }
}
