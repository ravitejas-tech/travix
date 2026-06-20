import { Type } from '@sinclair/typebox'
import { LiteralUnion, Nullable } from '@travix/crud'
import { ActivityType } from '@travix/shared'

export const ActivityResponse = Type.Object({
    id: Type.String(),
    name: Type.String(),
    description: Nullable(Type.String()),
    type: LiteralUnion(Object.values(ActivityType) as [ActivityType, ...ActivityType[]]),
    sortOrder: Type.Integer(),
    isCustom: Type.Boolean(),
})

export const ItineraryDayResponse = Type.Object({
    id: Type.String(),
    dayNumber: Type.Integer(),
    summary: Nullable(Type.String()),
    activities: Type.Array(ActivityResponse),
})
