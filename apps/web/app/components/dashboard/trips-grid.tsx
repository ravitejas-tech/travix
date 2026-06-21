import { AnimatePresence, motion } from 'framer-motion'

import type { V1TripsControllerListResponse } from '~/api'
import { TripCard } from './trip-card'

interface TripsGridProps {
    trips: V1TripsControllerListResponse['items']
    onDelete: (tripId: string) => void
    deletingId: string | null
}

export function TripsGrid({ trips, onDelete, deletingId }: TripsGridProps) {
    return (
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
                {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} onDelete={onDelete} deleting={deletingId === trip.id} />
                ))}
            </AnimatePresence>
        </motion.div>
    )
}
