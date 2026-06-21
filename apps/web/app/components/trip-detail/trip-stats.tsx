import { motion } from 'framer-motion'
import { Activity, CalendarDays, Hotel, Wallet, type LucideIcon } from 'lucide-react'

import type { V1TripsControllerDetailResponse } from '~/api'
import { formatMoney } from '~/lib/format'

interface TripStatsProps {
    trip: V1TripsControllerDetailResponse
}

export function TripStats({ trip }: TripStatsProps) {
    const activityCount = trip.days.reduce((sum, day) => sum + day.activities.length, 0)
    const symbol = trip.budget?.currencySymbol ?? '$'

    const stats: { label: string; value: string; icon: LucideIcon }[] = [
        { label: 'Duration', value: `${trip.numberOfDays} days`, icon: CalendarDays },
        { label: 'Activities', value: String(activityCount), icon: Activity },
        { label: 'Hotels', value: String(trip.hotels.length), icon: Hotel },
        { label: 'Est. budget', value: formatMoney(trip.total, symbol), icon: Wallet },
    ]

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-lg font-bold tracking-tight text-primary">{stat.value}</p>
                            <p className="text-xs font-medium text-muted">{stat.label}</p>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
