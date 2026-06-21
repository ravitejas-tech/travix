import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { RobotMascot } from '~/components/dashboard/chat/robot-mascot'

const MESSAGES = [
    'Scouting the best spots…',
    'Crafting your day-by-day plan…',
    'Estimating your budget…',
    'Picking places to stay…',
]

export function GeneratingOverlay() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 1800)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center gap-6 px-8 py-16 text-center">
            <RobotMascot />

            <div>
                <h3 className="text-xl font-bold text-primary">Travix is planning your trip</h3>
                <div className="mt-2 h-5 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="text-sm text-muted"
                        >
                            {MESSAGES[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex gap-1.5">
                {MESSAGES.map((_, i) => (
                    <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            i === index ? 'bg-primary' : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}
