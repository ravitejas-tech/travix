import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import type { V1TripsControllerDetailResponse } from '~/api'
import { useRemoveActivity } from '~/queries/itinerary.query'
import { invalidateTrip } from '~/queries/trips.query'
import { ActivityTimelineItem } from './activity-timeline-item'
import { AddActivityForm } from './add-activity-form'
import { RegenerateDay } from './regenerate-day'

type Day = V1TripsControllerDetailResponse['days'][number]

interface DayTimelineSectionProps {
    tripId: string
    day: Day
}

export function DayTimelineSection({ tripId, day }: DayTimelineSectionProps) {
    const [adding, setAdding] = useState(false)
    const { mutate: removeActivity, variables, isPending } = useRemoveActivity()

    const handleRemove = (activityId: string) =>
        removeActivity(
            { tripId, dayId: day.id, activityId },
            {
                onSuccess: () => {
                    invalidateTrip(tripId)
                    toast.success('Activity removed successfully.')
                },
                onError: () => toast.error('Could not remove this activity.'),
            },
        )

    return (
        <div className="relative">
            {/* Vertical connection line between days */}
            <div className="absolute left-[11px] top-10 bottom-0 w-0.5 bg-slate-200" />

            {/* Day Header Marker & Row */}
            <div className="mb-4 flex items-start justify-between gap-3 relative z-30">
                <div className="flex items-start gap-4">
                    {/* Glowing Day Node */}
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-md shadow-primary/25 border-2 border-white ring-4 ring-primary/10">
                        {day.dayNumber}
                    </div>
                    <div className="pt-0.5">
                        <h3 className="text-base font-extrabold text-primary tracking-tight leading-none">
                            Day {day.dayNumber}
                        </h3>
                        {day.summary && (
                            <p className="mt-1 text-xs text-muted/80 font-medium leading-relaxed max-w-lg">
                                {day.summary}
                            </p>
                        )}
                    </div>
                </div>
                <RegenerateDay tripId={tripId} dayId={day.id} />
            </div>

            {/* Activities list along the line */}
            <ul className="relative z-10 flex flex-col">
                <AnimatePresence mode="popLayout">
                    {day.activities.map((activity) => (
                        <ActivityTimelineItem
                            key={activity.id}
                            activity={activity}
                            onRemove={() => handleRemove(activity.id)}
                            removing={isPending && variables?.activityId === activity.id}
                        />
                    ))}
                </AnimatePresence>
            </ul>

            {/* Add activity section at bottom of day */}
            <div className="relative pl-8 pb-8 last:pb-2 z-10 group">
                {/* Connecting vertical line snippet for add action */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-slate-200 group-last:hidden" />
                {/* Bullets for add action */}
                <div className="absolute left-[8px] top-2 h-2 w-2 rounded-full border border-dashed border-primary bg-white shadow-sm" />

                <AnimatePresence mode="wait">
                    {adding ? (
                        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                            <AddActivityForm
                                key="form"
                                tripId={tripId}
                                dayId={day.id}
                                onDone={() => setAdding(false)}
                            />
                        </div>
                    ) : (
                        <button
                            key="btn"
                            onClick={() => setAdding(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all hover:text-primary-dark hover:translate-x-0.5 active:translate-x-0"
                        >
                            <Plus className="h-3.5 w-3.5" /> Add activity
                        </button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
