import type { UseFormReturn } from 'react-hook-form'

import { INTEREST_OPTIONS } from '~/data/trip.constants'
import type { CreateTripValues } from '~/schemas/trip.schema'

interface PlannerStepInterestsProps {
    form: UseFormReturn<CreateTripValues>
}

export function PlannerStepInterests({ form }: PlannerStepInterestsProps) {
    const { watch, setValue, formState } = form
    const interests = watch('interests')

    const toggle = (value: string) => {
        const next = interests.includes(value) ? interests.filter((i) => i !== value) : [...interests, value]
        setValue('interests', next, { shouldValidate: true })
    }

    return (
        <div className="flex flex-col gap-3">
            <div>
                <h3 className="text-base font-bold text-primary tracking-tight">What are you into?</h3>
                <p className="text-xs text-muted/80 mt-0.5">
                    Select at least one interest to tailor your daily activities.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((option) => {
                    const Icon = option.icon
                    const active = interests.includes(option.value)
                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => toggle(option.value)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                                active
                                    ? 'border-primary bg-primary text-white shadow-sm shadow-primary/20 scale-105'
                                    : 'border-slate-100 bg-white text-muted/80 hover:border-primary/30 hover:text-primary'
                            }`}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            {option.label}
                        </button>
                    )
                })}
            </div>

            {formState.errors.interests && (
                <span className="text-xs font-medium text-red-500 pl-1">{formState.errors.interests.message}</span>
            )}
        </div>
    )
}
