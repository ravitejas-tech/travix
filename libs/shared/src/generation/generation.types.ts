import { ActivityType, BudgetType, HotelCategory } from '../enums'

export interface GenerationContext {
    destination: string
    numberOfDays: number
    budgetType: BudgetType
    interests: string[]
    currencyCode: string
}

export interface GeneratedActivity {
    name: string
    description: string | null
    type: ActivityType
}

export interface GeneratedDay {
    dayNumber: number
    summary: string | null
    activities: GeneratedActivity[]
}

export interface GeneratedBudget {
    flights: number | null
    accommodation: number | null
    food: number | null
    activities: number | null
    total: number
}

export interface GeneratedHotel {
    name: string
    category: HotelCategory
    rating: number | null
    description: string | null
}

export interface GeneratedTrip {
    days: GeneratedDay[]
    budget: GeneratedBudget
    hotels: GeneratedHotel[]
}
