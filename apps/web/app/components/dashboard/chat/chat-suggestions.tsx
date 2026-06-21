import { motion } from 'framer-motion'

import { INTEREST_OPTIONS } from '~/data/trip.constants'

interface ChatSuggestionsProps {
    onPick: (interest: string) => void
}

export function ChatSuggestions({ onPick }: ChatSuggestionsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2"
        >
            {INTEREST_OPTIONS.map((option) => {
                const Icon = option.icon
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onPick(option.value)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-muted transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-sm"
                    >
                        <Icon className="h-3.5 w-3.5 text-accent" />#{option.value}
                    </button>
                )
            })}
        </motion.div>
    )
}
