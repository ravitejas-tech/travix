import { Bed, CalendarDays, Hotel, Plane, Ticket, Utensils, Wallet, type LucideIcon } from 'lucide-react'

import type { V1TripsControllerDetailResponse } from '~/api'
import type { ActivityTypeValue } from './trip.constants'

type BudgetEstimate = NonNullable<V1TripsControllerDetailResponse['budget']>

/** Border/background/icon styling per activity type for the itinerary timeline. */
export const ACTIVITY_TYPE_STYLES: Record<
    ActivityTypeValue,
    { border: string; bg: string; iconBg: string; text: string }
> = {
    food: {
        border: 'border-l-orange-400 hover:border-orange-500',
        bg: 'bg-orange-50/30',
        iconBg: 'bg-orange-100 text-orange-600',
        text: 'text-orange-900',
    },
    culture: {
        border: 'border-l-violet-400 hover:border-violet-500',
        bg: 'bg-violet-50/30',
        iconBg: 'bg-violet-100 text-violet-600',
        text: 'text-violet-900',
    },
    adventure: {
        border: 'border-l-emerald-400 hover:border-emerald-500',
        bg: 'bg-emerald-50/30',
        iconBg: 'bg-emerald-100 text-emerald-600',
        text: 'text-emerald-900',
    },
    shopping: {
        border: 'border-l-rose-400 hover:border-rose-500',
        bg: 'bg-rose-50/30',
        iconBg: 'bg-rose-100 text-rose-600',
        text: 'text-rose-900',
    },
    sightseeing: {
        border: 'border-l-sky-400 hover:border-sky-500',
        bg: 'bg-sky-50/30',
        iconBg: 'bg-sky-100 text-sky-600',
        text: 'text-sky-900',
    },
    other: {
        border: 'border-l-slate-400 hover:border-slate-500',
        bg: 'bg-slate-50/30',
        iconBg: 'bg-slate-100 text-slate-600',
        text: 'text-slate-900',
    },
}

/** Rows for the budget breakdown, in display order. */
export const BUDGET_BREAKDOWN_ROWS: { key: keyof BudgetEstimate; label: string; icon: LucideIcon }[] = [
    { key: 'flights', label: 'Flights', icon: Plane },
    { key: 'accommodation', label: 'Accommodation', icon: Bed },
    { key: 'food', label: 'Food', icon: Utensils },
    { key: 'activities', label: 'Activities', icon: Ticket },
]

/** Tabs on the trip detail page. */
export const TRIP_DETAIL_TABS = [
    { key: 'itinerary', label: 'Itinerary', icon: CalendarDays },
    { key: 'budget', label: 'Budget', icon: Wallet },
    { key: 'hotels', label: 'Hotels', icon: Hotel },
] as const

export type TripTabKey = (typeof TRIP_DETAIL_TABS)[number]['key']
