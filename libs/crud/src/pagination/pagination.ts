import { TSchema, Type } from '@sinclair/typebox'
import { IPaginationLinks, IPaginationMeta, ObjectLiteral } from './interfaces'
import { Nullable } from '../util'

export class Pagination<PaginationObject, T extends ObjectLiteral = IPaginationMeta> {
    constructor(
        public readonly items: PaginationObject[],
        public readonly meta: T,
        public readonly links?: IPaginationLinks,
    ) {}
}

export const PaginatedResponse = <T extends TSchema>(itemSchema: T) =>
    Type.Object({
        items: Type.Array(itemSchema),
        meta: Type.Object({
            itemCount: Type.Number(),
            itemsPerPage: Type.Number(),
            currentPage: Type.Number(),
            totalItems: Nullable(Type.Number()),
            totalPages: Nullable(Type.Number()),
        }),
        links: Nullable(
            Type.Object({
                first: Type.Optional(Type.String()),
                last: Type.Optional(Type.String()),
                next: Type.Optional(Type.String()),
                previous: Type.Optional(Type.String()),
            }),
        ),
    })
