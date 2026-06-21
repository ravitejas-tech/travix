import { motion } from 'framer-motion'

import type { V1TripsControllerDetailResponse } from '~/api'
import { DayTimelineSection } from './day-timeline-section'

interface ItineraryTimelineProps {
    tripId: string
    days: V1TripsControllerDetailResponse['days']
}

export function ItineraryTimeline({ tripId, days }: ItineraryTimelineProps) {
    if (days.length === 0) {
        return <p className="py-12 text-center text-sm text-muted">No itinerary days yet.</p>
    }

    return (
        <div className="flex flex-col gap-6 relative pl-2">
            {/* Background timeline gradient line */}
            <div className="absolute left-[13px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/35 via-accent/35 to-primary/5" />

            {days.map((day, i) => (
                <motion.div
                    key={day.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                >
                    <DayTimelineSection tripId={tripId} day={day} />
                </motion.div>
            ))}
        </div>
    )
}
