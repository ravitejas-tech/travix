import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { useMemo } from 'react'

import type { V1TripsControllerListResponse } from '~/api'
import { INTEREST_CLOUD_META } from '~/data/analytics.constants'

interface InterestCloudProps {
    trips: V1TripsControllerListResponse['items']
}

export function InterestCloud({ trips }: InterestCloudProps) {
    const interests = useMemo(() => {
        const map = new Map<string, number>()
        for (const trip of trips) {
            for (const interest of trip.interests) {
                map.set(interest, (map.get(interest) ?? 0) + 1)
            }
        }
        return Array.from(map.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
    }, [trips])

    if (interests.length === 0) return null

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-100/50"
        >
            <div className="mb-4">
                <h2 className="text-base font-bold text-primary tracking-tight">Your Interests</h2>
                <p className="text-xs text-muted/80">Themes from your planned itineraries.</p>
            </div>

            <div className="flex flex-wrap gap-2.5">
                {interests.map(([name, count], i) => {
                    const meta = INTEREST_CLOUD_META[name] || {
                        label: name,
                        icon: Compass,
                        colors: 'bg-slate-50 border-slate-100 text-slate-700',
                    }
                    const Icon = meta.icon

                    return (
                        <motion.span
                            key={name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.55 + i * 0.05 }}
                            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize shadow-sm transition-all hover:scale-105 ${meta.colors}`}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            <span>{meta.label}</span>
                            <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/75 text-[10px] font-extrabold shadow-sm border border-black/5">
                                {count}
                            </span>
                        </motion.span>
                    )
                })}
            </div>
        </motion.section>
    )
}
