import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import type { ComingSoonContent } from '~/data/coming-soon.constants'

interface ComingSoonProps {
    content: ComingSoonContent
}

export function ComingSoon({ content }: ComingSoonProps) {
    const Icon = content.icon

    return (
        <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50"
            >
                <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark p-8 text-white">
                    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent/25 blur-3xl" />
                    <div className="relative z-10 flex items-center justify-between">
                        <motion.span
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur"
                        >
                            <Icon className="h-7 w-7" />
                        </motion.span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
                            <Sparkles className="h-3.5 w-3.5" /> Coming soon
                        </span>
                    </div>
                    <p className="relative z-10 mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                        {content.eyebrow}
                    </p>
                    <h1 className="relative z-10 mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">
                        {content.title}
                    </h1>
                    <p className="relative z-10 mt-2 max-w-lg text-sm text-white/75">{content.tagline}</p>
                </div>

                <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
                    {content.features.map((feature, i) => {
                        const FeatureIcon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.08 }}
                                className="rounded-2xl border border-slate-100 bg-slate-50/40 p-4"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <FeatureIcon className="h-5 w-5" />
                                </span>
                                <h3 className="mt-3 text-sm font-bold text-primary">{feature.title}</h3>
                                <p className="mt-1 text-xs leading-relaxed text-muted">{feature.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>

            <p className="mt-6 text-center text-xs text-muted/70">
                We're building this next. In the meantime, keep planning from the{' '}
                <span className="font-semibold text-primary">Plan</span> tab.
            </p>
        </div>
    )
}
