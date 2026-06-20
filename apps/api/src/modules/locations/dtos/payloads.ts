import { Type } from '@sinclair/typebox'
import { MAX_PAGE_SIZE } from '@travix/shared'

export const SearchCitiesSearch = Type.String({ example: 'tokyo' })

export const PageQuery = Type.Integer({ minimum: 1, default: 1 })

export const LimitQuery = Type.Integer({ minimum: 1, maximum: MAX_PAGE_SIZE, default: 20 })
