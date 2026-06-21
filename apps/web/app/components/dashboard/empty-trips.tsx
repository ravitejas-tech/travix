import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'

export function EmptyTrips() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center"
        >
            <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            >
                <Compass className="h-8 w-8" />
            </motion.div>
            <h3 className="text-xl font-bold text-primary">No trips yet</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
                Tell Travix where you'd like to go and get a complete, personalized itinerary in seconds. Use the{' '}
                <strong>Plan a new trip</strong> button in the sidebar to get started.
            </p>
        </motion.div>
    )
}
