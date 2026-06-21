import type { UseFormReturn } from 'react-hook-form'

import { INTEREST_OPTIONS } from '~/data/trip.constants'
import type { CreateTripValues } from '~/schemas/trip.schema'

interface StepInterestsProps {
    form: UseFormReturn<CreateTripValues>
}

export function StepInterests({ form }: StepInterestsProps) {
    const { watch, setValue, formState } = form
    const interests = watch('interests')

    const toggle = (value: string) => {
        const next = interests.includes(value) ? interests.filter((i) => i !== value) : [...interests, value]
        setValue('interests', next, { shouldValidate: true })
    }

    return (
        <div className="flex flex-col gap-3">
            <div>
                <h3 className="text-lg font-semibold text-primary">What are you into?</h3>
                <p className="text-sm text-muted">Travix tailors every day around what you pick.</p>
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
                            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                active
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-gray-200 text-muted hover:border-primary/40'
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {option.label}
                        </button>
                    )
                })}
            </div>

            {formState.errors.interests && (
                <span className="text-xs text-red-500">{formState.errors.interests.message}</span>
            )}
        </div>
    )
}
