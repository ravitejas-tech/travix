import { IPaginationLinks, IPaginationMeta, IPaginationOptionsRoutingLabels, ObjectLiteral } from './interfaces'
import { Pagination } from './pagination'

export function createPaginationObject<T, CustomMetaType extends ObjectLiteral = IPaginationMeta>({
    items,
    totalItems,
    currentPage,
    limit,
    route,
    metaTransformer,
    routingLabels,
}: {
    items: T[]
    totalItems?: number
    currentPage: number
    limit: number
    route?: string
    metaTransformer?: (meta: IPaginationMeta) => CustomMetaType
    routingLabels?: IPaginationOptionsRoutingLabels
}): Pagination<T, CustomMetaType> {
    const totalPages = totalItems !== undefined ? Math.ceil(totalItems / limit) : undefined
    const symbol = route && new RegExp(/\?/).test(route) ? '&' : '?'
    const limitLabel = routingLabels?.limitLabel ?? 'limit'
    const pageLabel = routingLabels?.pageLabel ?? 'page'

    const routes: IPaginationLinks =
        totalItems !== undefined
            ? {
                  first: route ? `${route}${symbol}${limitLabel}=${limit}` : '',
                  previous: route && currentPage > 1 ? `${route}${symbol}${pageLabel}=${currentPage - 1}&${limitLabel}=${limit}` : '',
                  next: route && totalPages && currentPage < totalPages ? `${route}${symbol}${pageLabel}=${currentPage + 1}&${limitLabel}=${limit}` : '',
                  last: route && totalPages && totalPages > 0 ? `${route}${symbol}${pageLabel}=${totalPages}&${limitLabel}=${limit}` : '',
              }
            : undefined

    const meta: IPaginationMeta = {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage,
    }

    const links = route ? routes : undefined

    if (metaTransformer) return new Pagination<T, CustomMetaType>(items, metaTransformer(meta), links)
    // @ts-ignore
    return new Pagination<T, CustomMetaType>(items, meta, links)
}
