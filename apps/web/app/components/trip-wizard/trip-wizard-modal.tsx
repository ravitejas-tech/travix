import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { Modal } from '~/components/ui/modal'
import { queryClient } from '~/lib/query-client'
import { useCreateTrip, useTrips } from '~/queries/trips.query'
import { createTripSchema, type CreateTripValues } from '~/schemas/trip.schema'
import { GeneratingOverlay } from './generating-overlay'
import { StepLocation } from './step-location'
import { StepDestination } from './step-destination'
import { StepDetails } from './step-details'
import { StepInterests } from './step-interests'
import { WizardProgress } from './wizard-progress'

const STEP_FIELDS: (keyof CreateTripValues)[][] = [
    ['userLocationId'],
    ['cityId'],
    ['numberOfDays', 'budgetType'],
    ['interests'],
]

interface TripWizardModalProps {
    open: boolean
    onClose: () => void
    initialInterests?: string[]
}

export function TripWizardModal({ open, onClose, initialInterests }: TripWizardModalProps) {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const { mutate, isPending } = useCreateTrip()
    const form = useForm<CreateTripValues>({
        resolver: zodResolver(createTripSchema),
        defaultValues: {
            userLocationId: '',
            userLocationLabel: '',
            cityId: '',
            cityLabel: '',
            numberOfDays: 5,
            budgetType: 'medium',
            interests: [],
            currencyCode: 'USD',
        },
    })

    useEffect(() => {
        if (!open) return
        setStep(0)
        form.reset({
            userLocationId: '',
            userLocationLabel: '',
            cityId: '',
            cityLabel: '',
            numberOfDays: 5,
            budgetType: 'medium',
            interests: initialInterests ?? [],
            currencyCode: 'USD',
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const next = async () => {
        if (await form.trigger(STEP_FIELDS[step])) setStep((s) => s + 1)
    }

    const submit = form.handleSubmit(({ cityLabel: _l, userLocationLabel: _ul, ...payload }) =>
        mutate(payload, {
            onSuccess: (trip) => {
                queryClient.invalidateQueries({ queryKey: useTrips.getKey() })
                toast.success('Your itinerary is ready!')
                onClose()
                navigate(`/dashboard/trips/${trip.id}`)
            },
            onError: () => toast.error("Couldn't generate your trip. Try again."),
        }),
    )

    return (
        <Modal open={open} onClose={isPending ? () => {} : onClose}>
            {isPending ? (
                <GeneratingOverlay />
            ) : (
                <div className="p-6 sm:p-8">
                    <WizardProgress current={step} />
                    <div className="mt-6 min-h-[260px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }}
                                transition={{ duration: 0.25 }}
                            >
                                {step === 0 && <StepLocation form={form} />}
                                {step === 1 && <StepDestination form={form} />}
                                {step === 2 && <StepDetails form={form} />}
                                {step === 3 && <StepInterests form={form} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setStep((s) => s - 1)}
                            className={`inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary ${
                                step === 0 ? 'invisible' : ''
                            }`}
                        >
                            <ArrowLeft className="h-4 w-4" /> Back
                        </button>

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={next}
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                            >
                                Continue <ArrowRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={submit}
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                            >
                                <Sparkles className="h-4 w-4" /> Generate trip
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    )
}
