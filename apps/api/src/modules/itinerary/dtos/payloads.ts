import { Type } from '@sinclair/typebox'
import { LiteralUnion, Nullable } from '@travix/crud'
import { ActivityType } from '@travix/shared'

export const TripIdParam = Type.String()
export const DayIdParam = Type.String()
export const ActivityIdParam = Type.String()

export const RegenerateDayPayload = Type.Object({
    instructions: Nullable(Type.String({ example: 'Regenerate with more outdoor activities' })),
})

export const AddActivityPayload = Type.Object({
    name: Type.String({ example: 'Sunset cruise' }),
    description: Nullable(Type.String()),
    type: LiteralUnion(Object.values(ActivityType) as [ActivityType, ...ActivityType[]], {
        example: ActivityType.ADVENTURE,
    }),
})
