import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { TRIP_SORT_OPTIONS, type TripSortValue } from '~/data/trip.constants'

interface TripsSortProps {
    value: TripSortValue
    onChange: (value: TripSortValue) => void
}

export function TripsSort({ value, onChange }: TripsSortProps) {
    return (
        <div className="relative flex items-center gap-2 rounded-xl border border-slate-200 bg-white pl-3 pr-2 shadow-sm transition-colors focus-within:border-primary/40">
            <ArrowUpDown className="h-4 w-4 shrink-0 text-muted" />
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as TripSortValue)}
                aria-label="Sort trips"
                className="cursor-pointer appearance-none bg-transparent py-2.5 pr-6 text-sm font-medium text-primary outline-none"
            >
                {TRIP_SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted" />
        </div>
    )
}
