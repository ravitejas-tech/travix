import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import { useMemo } from 'react'

import type { V1TripsControllerListResponse } from '~/api'
import type { BudgetValue } from '~/data/trip.constants'

const BUDGET_COLORS: Record<BudgetValue, { bar: string; dot: string; label: string }> = {
    low: { bar: 'bg-gradient-to-r from-emerald-400 to-teal-500', dot: 'bg-emerald-500', label: 'Budget Class' },
    medium: { bar: 'bg-gradient-to-r from-sky-400 to-primary', dot: 'bg-sky-500', label: 'Balanced Class' },
    high: { bar: 'bg-gradient-to-r from-violet-500 to-fuchsia-500', dot: 'bg-violet-500', label: 'Luxury Class' },
}

interface BudgetOverviewProps {
    trips: V1TripsControllerListResponse['items']
}

export function BudgetOverview({ trips }: BudgetOverviewProps) {
    const data = useMemo(() => {
        const counts: Record<BudgetValue, number> = { low: 0, medium: 0, high: 0 }
        for (const trip of trips) counts[trip.budgetType]++
        const total = trips.length || 1
        return (Object.keys(counts) as BudgetValue[]).map((key) => ({
            key,
            count: counts[key],
            pct: (counts[key] / total) * 100,
            ...BUDGET_COLORS[key],
        }))
    }, [trips])

    if (trips.length === 0) return null

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-100/50"
        >
            <div className="mb-4">
                <h2 className="text-base font-bold text-primary tracking-tight">Budget Breakdown</h2>
                <p className="text-xs text-muted/80">Distribution of your travel spending tiers.</p>
            </div>

            <div className="mb-5 flex h-3 overflow-hidden rounded-full bg-slate-50 border border-slate-100 p-0.5">
                {data.map((d) =>
                    d.count > 0 ? (
                        <motion.div
                            key={d.key}
                            className={`${d.bar} first:rounded-l-full last:rounded-r-full h-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${d.pct}%` }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        />
                    ) : null,
                )}
            </div>

            <div className="grid grid-cols-3 gap-3">
                {data.map((d) => (
                    <div
                        key={d.key}
                        className="flex flex-col gap-1 rounded-xl border border-slate-50 bg-slate-50/20 p-2.5 shadow-sm transition-all hover:bg-slate-50/40"
                    >
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/80">
                            <span className={`h-2 w-2 rounded-full ${d.dot}`} />
                            <span className="truncate">{d.label.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-baseline justify-between mt-0.5">
                            <span className="text-sm font-extrabold text-primary">{d.count}</span>
                            <span className="text-[10px] font-bold text-muted/70">{d.pct.toFixed(0)}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    )
}
