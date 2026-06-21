import type { UseFormReturn } from 'react-hook-form'

import type { CreateTripValues } from '~/schemas/trip.schema'
import { CitySearch } from './city-search'

interface StepLocationProps {
    form: UseFormReturn<CreateTripValues>
}

export function StepLocation({ form }: StepLocationProps) {
    const { watch, setValue, formState } = form
    const userLocationLabel = watch('userLocationLabel')

    return (
        <div className="flex flex-col gap-3">
            <div>
                <h3 className="text-lg font-semibold text-primary">Where are you starting from?</h3>
                <p className="text-sm text-muted">
                    We use this to estimate your flight budget and travel costs accurately. (Optional)
                </p>
            </div>

            <CitySearch
                value={userLocationLabel ?? ''}
                placeholder="Search starting city, e.g. New York..."
                onSelect={(cityId, label) => {
                    setValue('userLocationId', cityId, { shouldValidate: true })
                    setValue('userLocationLabel', label)
                }}
            />

            {formState.errors.userLocationId && (
                <span className="text-xs text-red-500">{formState.errors.userLocationId.message}</span>
            )}
        </div>
    )
}
