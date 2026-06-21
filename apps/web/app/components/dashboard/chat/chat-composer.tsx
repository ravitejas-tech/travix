import { motion } from 'framer-motion'
import { ArrowUp, Sparkles } from 'lucide-react'

interface ChatComposerProps {
    onOpen: () => void
}

export function ChatComposer({ onOpen }: ChatComposerProps) {
    return (
        <motion.button
            type="button"
            onClick={onOpen}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 pl-4 text-left shadow-lg shadow-slate-200/50 transition-all hover:border-primary/40 hover:shadow-primary/10"
        >
            <Sparkles className="h-5 w-5 shrink-0 text-accent" />
            <span className="min-w-0 flex-1 py-2 text-sm text-muted/60">e.g. A 5-day food trip to Tokyo…</span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-sm shadow-primary/25 transition-all group-hover:brightness-110 group-active:scale-95">
                <ArrowUp className="h-5 w-5" />
            </span>
        </motion.button>
    )
}
