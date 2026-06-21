import { motion } from 'framer-motion'
import { X, type LucideIcon } from 'lucide-react'

import type { V1TripsControllerDetailResponse } from '~/api'
import { ACTIVITY_TYPE_META, type ActivityTypeValue } from '~/data/trip.constants'

type Activity = V1TripsControllerDetailResponse['days'][number]['activities'][number]

interface ActivityTimelineItemProps {
    activity: Activity
    onRemove: () => void
    removing: boolean
}

const CATEGORY_STYLES: Record<ActivityTypeValue, { border: string; bg: string; iconBg: string; text: string }> = {
    food: {
        border: 'border-l-orange-400 hover:border-orange-500',
        bg: 'bg-orange-50/30',
        iconBg: 'bg-orange-100 text-orange-600',
        text: 'text-orange-900',
    },
    culture: {
        border: 'border-l-violet-400 hover:border-violet-500',
        bg: 'bg-violet-50/30',
        iconBg: 'bg-violet-100 text-violet-600',
        text: 'text-violet-900',
    },
    adventure: {
        border: 'border-l-emerald-400 hover:border-emerald-500',
        bg: 'bg-emerald-50/30',
        iconBg: 'bg-emerald-100 text-emerald-600',
        text: 'text-emerald-900',
    },
    shopping: {
        border: 'border-l-rose-400 hover:border-rose-500',
        bg: 'bg-rose-50/30',
        iconBg: 'bg-rose-100 text-rose-600',
        text: 'text-rose-900',
    },
    sightseeing: {
        border: 'border-l-sky-400 hover:border-sky-500',
        bg: 'bg-sky-50/30',
        iconBg: 'bg-sky-100 text-sky-600',
        text: 'text-sky-900',
    },
    other: {
        border: 'border-l-slate-400 hover:border-slate-500',
        bg: 'bg-slate-50/30',
        iconBg: 'bg-slate-100 text-slate-600',
        text: 'text-slate-900',
    },
}

export function ActivityTimelineItem({ activity, onRemove, removing }: ActivityTimelineItemProps) {
    const meta = ACTIVITY_TYPE_META[activity.type] || ACTIVITY_TYPE_META.other
    const Icon = meta.icon
    const styles = CATEGORY_STYLES[activity.type] || CATEGORY_STYLES.other

    return (
        <motion.li
            layout
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            className="group relative flex items-start gap-4 pl-8 pb-6 last:pb-2"
        >
            {/* Connecting vertical line snippet */}
            <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-slate-150 group-last:hidden" />

            {/* Small bullet node on the line */}
            <div className="absolute left-[7px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-slate-300 shadow-sm transition-colors group-hover:bg-primary" />

            <div
                className={`flex-1 flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 border-l-4 ${styles.border} ${styles.bg} shadow-sm shadow-slate-100/30 hover:shadow-md transition-all duration-200`}
            >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${styles.iconBg}`}>
                    <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-bold text-primary">
                        {activity.name}
                        {activity.isCustom && (
                            <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                                Added
                            </span>
                        )}
                    </p>
                    {activity.description && (
                        <p className="mt-1 text-xs text-muted/80 leading-relaxed font-medium">{activity.description}</p>
                    )}
                </div>
                <button
                    onClick={onRemove}
                    disabled={removing}
                    aria-label="Remove activity"
                    className="rounded-lg p-1.5 text-muted/50 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 disabled:opacity-50 hover:scale-105 active:scale-95"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>
        </motion.li>
    )
}
