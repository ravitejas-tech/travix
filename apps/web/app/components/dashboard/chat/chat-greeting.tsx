import { motion } from 'framer-motion'

import { getGreeting } from '~/lib/greeting'
import { useAuthStore } from '~/stores/auth.store'

export function ChatGreeting() {
    const user = useAuthStore((s) => s.user)
    const name = user?.firstName ?? 'traveler'

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
        >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{getGreeting()}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Where to next, {name}?</h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                Tell Travix a destination and get a complete day-by-day itinerary, hotels and budget in seconds.
            </p>
        </motion.div>
    )
}
