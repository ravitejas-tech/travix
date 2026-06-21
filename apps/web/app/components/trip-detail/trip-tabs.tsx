import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import type { V1TripsControllerDetailResponse } from '~/api'
import { TRIP_DETAIL_TABS, type TripTabKey } from '~/data/trip-detail.constants'
import { BudgetBreakdown } from './budget-breakdown'
import { HotelsList } from './hotels-list'
import { ItineraryTimeline } from './itinerary-timeline'

interface TripTabsProps {
    trip: V1TripsControllerDetailResponse
}

export function TripTabs({ trip }: TripTabsProps) {
    const [active, setActive] = useState<TripTabKey>('itinerary')

    return (
        <div className="mt-6">
            <div className="flex gap-1 rounded-full border border-gray-100 bg-white p-1 shadow-sm">
                {TRIP_DETAIL_TABS.map((tab) => {
                    const Icon = tab.icon
                    const isActive = active === tab.key
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActive(tab.key)}
                            className="relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-colors"
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="trip-tab"
                                    className="absolute inset-0 rounded-full bg-primary"
                                    transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                                />
                            )}
                            <span
                                className={`relative z-10 flex items-center gap-1.5 ${
                                    isActive ? 'text-white' : 'text-muted'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="mt-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        {active === 'itinerary' && <ItineraryTimeline tripId={trip.id} days={trip.days} />}
                        {active === 'budget' && <BudgetBreakdown budget={trip.budget} />}
                        {active === 'hotels' && <HotelsList tripId={trip.id} hotels={trip.hotels} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
