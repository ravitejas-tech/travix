import { Type as SchemaType } from '@google/genai'
import { ActivityType, HotelCategory } from '../enums'

export const generationActivitySchema = {
    type: SchemaType.OBJECT,
    properties: {
        name: { type: SchemaType.STRING },
        description: { type: SchemaType.STRING, nullable: true },
        type: { type: SchemaType.STRING, enum: Object.values(ActivityType) },
    },
    required: ['name', 'type'],
}

export const generationDaySchema = {
    type: SchemaType.OBJECT,
    properties: {
        dayNumber: { type: SchemaType.INTEGER },
        summary: { type: SchemaType.STRING, nullable: true },
        activities: { type: SchemaType.ARRAY, items: generationActivitySchema },
    },
    required: ['dayNumber', 'activities'],
}

export const generationBudgetSchema = {
    type: SchemaType.OBJECT,
    properties: {
        flights: { type: SchemaType.NUMBER, nullable: true },
        accommodation: { type: SchemaType.NUMBER, nullable: true },
        food: { type: SchemaType.NUMBER, nullable: true },
        activities: { type: SchemaType.NUMBER, nullable: true },
        total: { type: SchemaType.NUMBER },
    },
    required: ['total'],
}

export const generationHotelSchema = {
    type: SchemaType.OBJECT,
    properties: {
        name: { type: SchemaType.STRING },
        category: { type: SchemaType.STRING, enum: Object.values(HotelCategory) },
        rating: { type: SchemaType.NUMBER, nullable: true },
        description: { type: SchemaType.STRING, nullable: true },
    },
    required: ['name', 'category'],
}

export const generationTripSchema = {
    type: SchemaType.OBJECT,
    properties: {
        days: { type: SchemaType.ARRAY, items: generationDaySchema },
        budget: generationBudgetSchema,
        hotels: { type: SchemaType.ARRAY, items: generationHotelSchema },
    },
    required: ['days', 'budget', 'hotels'],
}

export const generationHotelsSchema = {
    type: SchemaType.OBJECT,
    properties: {
        hotels: { type: SchemaType.ARRAY, items: generationHotelSchema },
    },
    required: ['hotels'],
}
