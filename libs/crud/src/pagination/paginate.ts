import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm'
import { createPaginationObject } from './create-pagination'
import { IPaginationMeta, IPaginationOptions, PaginationTypeEnum, TypeORMCacheType } from './interfaces'
import { Pagination } from './pagination'

const DEFAULT_LIMIT = 20
const DEFAULT_PAGE = 1

export async function paginate<T, CustomMetaType = IPaginationMeta>(
    repository: Repository<T>,
    options: IPaginationOptions<CustomMetaType>,
    searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
): Promise<Pagination<T, CustomMetaType>>
export async function paginate<T, CustomMetaType = IPaginationMeta>(
    queryBuilder: SelectQueryBuilder<T>,
    options: IPaginationOptions<CustomMetaType>,
): Promise<Pagination<T, CustomMetaType>>
export async function paginate<T, CustomMetaType = IPaginationMeta>(
    repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
    options: IPaginationOptions<CustomMetaType>,
    searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
) {
    return repositoryOrQueryBuilder instanceof Repository
        ? paginateRepository<T, CustomMetaType>(repositoryOrQueryBuilder, options, searchOptions)
        : paginateQueryBuilder<T, CustomMetaType>(repositoryOrQueryBuilder, options)
}

function resolveOptions(
    options: IPaginationOptions<any>,
): [number, number, string, PaginationTypeEnum, boolean, TypeORMCacheType] {
    const page = Number(options.page ?? DEFAULT_PAGE)
    const limit = Number(options.limit ?? DEFAULT_LIMIT)
    const route = options.route
    const paginationType = options.paginationType ?? PaginationTypeEnum.LIMIT_AND_OFFSET
    const countQueries = options.countQueries ?? true
    const cacheQueries = options.cacheQueries ?? false
    return [page, limit, route, paginationType, countQueries, cacheQueries]
}

async function paginateRepository<T, CustomMetaType = IPaginationMeta>(
    repository: Repository<T>,
    options: IPaginationOptions<CustomMetaType>,
    searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
): Promise<Pagination<T, CustomMetaType>> {
    const [page, limit, route, , countQueries] = resolveOptions(options)

    if (page < 1) {
        return createPaginationObject<T, CustomMetaType>({ items: [], totalItems: 0, currentPage: page, limit, route })
    }

    const [items, total] = await Promise.all([
        repository.find({ skip: limit * (page - 1), take: limit, ...searchOptions } as any),
        countQueries ? repository.count(searchOptions as any) : Promise.resolve(undefined),
    ])

    return createPaginationObject<T, CustomMetaType>({
        items,
        totalItems: total,
        currentPage: page,
        limit,
        route,
        metaTransformer: options.metaTransformer,
        routingLabels: options.routingLabels,
    })
}

export async function paginateQueryBuilder<T, CustomMetaType = IPaginationMeta>(
    queryBuilder: SelectQueryBuilder<T>,
    options: IPaginationOptions<CustomMetaType> = {},
): Promise<Pagination<T, CustomMetaType>> {
    const [page, limit, route, paginationType, countQueries, cacheOption] = resolveOptions(options)

    const [items, total] = await Promise.all([
        (paginationType === PaginationTypeEnum.LIMIT_AND_OFFSET
            ? queryBuilder.limit(limit).offset((page - 1) * limit)
            : queryBuilder.take(limit).skip((page - 1) * limit)
        )
            .cache(cacheOption)
            .getMany(),
        countQueries ? countQuery(queryBuilder, cacheOption) : Promise.resolve(undefined),
    ])

    return createPaginationObject<T, CustomMetaType>({
        items,
        totalItems: total,
        currentPage: page,
        limit,
        route,
        metaTransformer: options.metaTransformer,
        routingLabels: options.routingLabels,
    })
}

export async function paginateRaw<T, CustomMetaType extends ObjectLiteral = IPaginationMeta>(
    queryBuilder: SelectQueryBuilder<T>,
    options: IPaginationOptions<CustomMetaType> = {},
): Promise<Pagination<T, CustomMetaType>> {
    const [page, limit, route, paginationType, countQueries, cacheOption] = resolveOptions(options)

    const [items, total] = await Promise.all([
        (paginationType === PaginationTypeEnum.LIMIT_AND_OFFSET
            ? queryBuilder.limit(limit).offset((page - 1) * limit)
            : queryBuilder.take(limit).skip((page - 1) * limit)
        )
            .cache(cacheOption)
            .getRawMany<T>(),
        countQueries ? countQuery(queryBuilder, cacheOption) : Promise.resolve(undefined),
    ])

    return createPaginationObject<T, CustomMetaType>({
        items,
        totalItems: total,
        currentPage: page,
        limit,
        route,
        metaTransformer: options.metaTransformer,
        routingLabels: options.routingLabels,
    })
}

const countQuery = async <T>(queryBuilder: SelectQueryBuilder<T>, cacheOption: TypeORMCacheType): Promise<number> => {
    const totalQb = queryBuilder.clone()
    totalQb.skip(undefined).limit(undefined).offset(undefined).take(undefined).orderBy(undefined)

    const { value } = await queryBuilder.connection
        .createQueryBuilder()
        .select('COUNT(*)', 'value')
        .from(`(${totalQb.getQuery()})`, 'uniqueTableAlias')
        .cache(cacheOption)
        .setParameters(queryBuilder.getParameters())
        .getRawOne<{ value: string }>()

    return Number(value)
}
