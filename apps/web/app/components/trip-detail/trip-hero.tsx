import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, MapPin, Trash2, Wallet } from 'lucide-react'
import { Link } from 'react-router'

import type { V1TripsControllerDetailResponse } from '~/api'
import { StatusBadge } from '~/components/dashboard/status-badge'
import { BUDGET_LABEL } from '~/data/trip.constants'
import { formatMoney } from '~/lib/format'

interface TripHeroProps {
    trip: V1TripsControllerDetailResponse
    onDelete: () => void
    deleting: boolean
}

export function TripHero({ trip, onDelete, deleting }: TripHeroProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark p-6 text-white sm:p-8"
        >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
            <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-accent/15 blur-2xl" />

            <div className="relative z-10 flex items-center justify-between">
                <Link
                    to="/dashboard/trips"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                >
                    <ArrowLeft className="h-4 w-4" /> All trips
                </Link>
                <button
                    onClick={onDelete}
                    disabled={deleting}
                    aria-label="Delete trip"
                    className="rounded-full bg-white/10 p-2 text-white/80 backdrop-blur transition-colors hover:bg-red-500/80 hover:text-white disabled:opacity-60"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="relative z-10 mt-6">
                <p className="flex items-center gap-1.5 text-sm font-medium text-white/70">
                    <MapPin className="h-4 w-4" /> {trip.destination.countryName}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{trip.destination.cityName}</h1>
                    <StatusBadge status={trip.status} />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    <Chip icon={<CalendarDays className="h-4 w-4" />}>{trip.numberOfDays} days</Chip>
                    <Chip icon={<Wallet className="h-4 w-4" />}>{BUDGET_LABEL[trip.budgetType]}</Chip>
                    {trip.total != null && (
                        <Chip>{formatMoney(trip.total, trip.budget?.currencySymbol ?? '$')}</Chip>
                    )}
                </div>

                {trip.interests.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {trip.interests.map((interest) => (
                            <span
                                key={interest}
                                className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium capitalize text-white/80 backdrop-blur"
                            >
                                #{interest}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

function Chip({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold backdrop-blur">
            {icon}
            {children}
        </span>
    )
}
