import { motion } from 'framer-motion'
import { CalendarDays, Hotel, Wallet } from 'lucide-react'

import type { V1TripsControllerDetailResponse } from '~/api'
import { BudgetBreakdown } from './budget-breakdown'
import { HotelsList } from './hotels-list'
import { ItineraryTimeline } from './itinerary-timeline'

interface TripContentProps {
    trip: V1TripsControllerDetailResponse
}

export function TripContent({ trip }: TripContentProps) {
    return (
        <div className="space-y-8">
            <Section icon={CalendarDays} title="Itinerary" delay={0.1}>
                <ItineraryTimeline tripId={trip.id} days={trip.days} />
            </Section>

            <Section icon={Wallet} title="Budget" delay={0.2}>
                <BudgetBreakdown budget={trip.budget} />
            </Section>

            <Section icon={Hotel} title="Hotels" delay={0.3}>
                <HotelsList tripId={trip.id} hotels={trip.hotels} />
            </Section>
        </div>
    )
}

function Section({
    icon: Icon,
    title,
    delay,
    children,
}: {
    icon: typeof CalendarDays
    title: string
    delay: number
    children: React.ReactNode
}) {
    return (
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
            <div className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                </span>
                <h2 className="text-lg font-bold text-primary">{title}</h2>
            </div>
            {children}
        </motion.section>
    )
}
