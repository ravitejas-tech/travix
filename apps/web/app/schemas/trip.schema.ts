import { z } from 'zod'

export const createTripSchema = z.object({
    userLocationId: z.string().optional(),
    userLocationLabel: z.string().optional(),
    cityId: z.string().min(1, 'Pick a destination'),
    cityLabel: z.string().min(1),
    numberOfDays: z.number().int().min(1).max(30),
    budgetType: z.enum(['low', 'medium', 'high']),
    interests: z.array(z.string()).min(1, 'Pick at least one interest'),
    currencyCode: z.string().length(3),
})

export const addActivitySchema = z.object({
    name: z.string().min(1, 'Give the activity a name'),
    type: z.enum(['food', 'culture', 'adventure', 'shopping', 'sightseeing', 'other']),
    description: z.string().optional(),
})

export type CreateTripValues = z.infer<typeof createTripSchema>
export type AddActivityValues = z.infer<typeof addActivitySchema>
