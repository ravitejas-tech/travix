import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { queryClient } from '~/lib/query-client'
import { useCreateTrip, useTrips } from '~/queries/trips.query'
import { createTripSchema, type CreateTripValues } from '~/schemas/trip.schema'
import { GeneratingOverlay } from '../trip-wizard/generating-overlay'
import { PlannerStepDestination } from './planner-step-destination'
import { PlannerStepDetails } from './planner-step-details'
import { PlannerStepInterests } from './planner-step-interests'

const STEP_FIELDS: (keyof CreateTripValues)[][] = [['cityId'], ['numberOfDays', 'budgetType'], ['interests']]

interface InlinePlannerProps {
    alwaysExpanded?: boolean
}

export function InlinePlanner({ alwaysExpanded = false }: InlinePlannerProps) {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [isExpanded, setIsExpanded] = useState(alwaysExpanded)
    const { mutate, isPending } = useCreateTrip()

    const form = useForm<CreateTripValues>({
        resolver: zodResolver(createTripSchema),
        defaultValues: {
            cityId: '',
            cityLabel: '',
            numberOfDays: 5,
            budgetType: 'medium',
            interests: [],
            currencyCode: 'USD',
        },
    })

    const next = async () => {
        if (await form.trigger(STEP_FIELDS[step])) setStep((s) => s + 1)
    }

    const submit = form.handleSubmit(({ cityLabel: _l, ...payload }) =>
        mutate(payload, {
            onSuccess: (trip) => {
                queryClient.invalidateQueries({ queryKey: useTrips.getKey() })
                toast.success('AI itinerary generated successfully!')
                navigate(`/dashboard/trips/${trip.id}`)
            },
            onError: () => toast.error('Could not generate trip itinerary.'),
        }),
    )

    if (isPending) {
        return (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-100/50">
                <GeneratingOverlay />
            </div>
        )
    }

    return (
        <motion.div
            layout
            className="rounded-2xl border border-slate-100 bg-gradient-to-tr from-white to-slate-50/50 p-6 shadow-md shadow-slate-100/50 transition-all duration-300"
        >
            {!isExpanded ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-primary tracking-tight">Where is your next adventure?</h2>
                        <p className="text-xs text-muted/80">Plan a detailed AI itinerary in seconds.</p>
                    </div>
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 hover:shadow-md hover:brightness-110 active:scale-98 transition-all"
                    >
                        <Sparkles className="h-4 w-4" /> Start Planning
                    </button>
                </div>
            ) : (
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-accent tracking-wider uppercase">
                            AI Planner — Step {step + 1} of 3
                        </span>
                        {!alwaysExpanded && (
                            <button
                                onClick={() => {
                                    setIsExpanded(false)
                                    setStep(0)
                                    form.reset()
                                }}
                                className="text-xs text-muted hover:text-primary font-medium"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    <div className="min-h-[140px] py-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.2 }}
                            >
                                {step === 0 && <PlannerStepDestination form={form} />}
                                {step === 1 && <PlannerStepDetails form={form} />}
                                {step === 2 && <PlannerStepInterests form={form} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={() => setStep((s) => s - 1)}
                            className={`inline-flex items-center gap-1.5 text-xs font-bold text-muted/80 transition-colors hover:text-primary ${
                                step === 0 ? 'invisible' : ''
                            }`}
                        >
                            <ArrowLeft className="h-3.5 w-3.5" /> Back
                        </button>

                        {step < 2 ? (
                            <button
                                type="button"
                                onClick={next}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-98"
                            >
                                Continue <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={submit}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-xs font-bold text-white shadow-sm shadow-primary/20 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-98"
                            >
                                <Sparkles className="h-3.5 w-3.5" /> Generate Trip
                            </button>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    )
}
