import type { UseFormReturn } from 'react-hook-form'
import type { CreateTripValues } from '~/schemas/trip.schema'
import { CitySearch } from '../trip-wizard/city-search'

interface PlannerStepDestinationProps {
    form: UseFormReturn<CreateTripValues>
}

export function PlannerStepDestination({ form }: PlannerStepDestinationProps) {
    const { watch, setValue, formState } = form
    const cityLabel = watch('cityLabel')

    return (
        <div className="flex flex-col gap-3">
            <div>
                <h3 className="text-lg font-bold text-primary tracking-tight">Where is your next adventure?</h3>
                <p className="text-xs text-muted/85 mt-0.5">
                    Enter a city and Travix will customize the perfect itinerary for you.
                </p>
            </div>

            <div className="relative">
                <CitySearch
                    value={cityLabel || ''}
                    onSelect={(cityId, label) => {
                        setValue('cityId', cityId, { shouldValidate: true })
                        setValue('cityLabel', label)
                    }}
                />
            </div>

            {formState.errors.cityId && (
                <span className="text-xs font-medium text-red-500 pl-1">{formState.errors.cityId.message}</span>
            )}
        </div>
    )
}
