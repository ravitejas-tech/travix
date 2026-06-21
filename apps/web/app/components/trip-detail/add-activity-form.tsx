import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ACTIVITY_TYPE_META, type ActivityTypeValue } from '~/data/trip.constants'
import { useAddActivity } from '~/queries/itinerary.query'
import { invalidateTrip } from '~/queries/trips.query'
import { addActivitySchema, type AddActivityValues } from '~/schemas/trip.schema'

const TYPES = Object.keys(ACTIVITY_TYPE_META) as ActivityTypeValue[]

interface AddActivityFormProps {
    tripId: string
    dayId: string
    onDone: () => void
}

export function AddActivityForm({ tripId, dayId, onDone }: AddActivityFormProps) {
    const { mutate, isPending } = useAddActivity()
    const { register, handleSubmit, watch, setValue, formState } = useForm<AddActivityValues>({
        resolver: zodResolver(addActivitySchema),
        defaultValues: { name: '', type: 'sightseeing' },
    })
    const type = watch('type')

    const onSubmit = (values: AddActivityValues) => {
        mutate(
            { tripId, dayId, ...values },
            {
                onSuccess: () => {
                    invalidateTrip(tripId)
                    toast.success('Activity added.')
                    onDone()
                },
                onError: () => toast.error("Couldn't add the activity."),
            },
        )
    }

    return (
        <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3"
        >
            <input
                {...register('name')}
                placeholder="Activity name"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-primary outline-none focus:border-primary"
            />
            {formState.errors.name && <span className="text-xs text-red-500">{formState.errors.name.message}</span>}
            <div className="flex flex-wrap gap-1.5">
                {TYPES.map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setValue('type', value)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            type === value ? 'bg-primary text-white' : 'bg-white text-muted hover:text-primary'
                        }`}
                    >
                        {ACTIVITY_TYPE_META[value].label}
                    </button>
                ))}
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onDone}
                    className="rounded-full px-4 py-1.5 text-sm font-medium text-muted hover:text-primary"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
                >
                    {isPending ? 'Adding…' : 'Add'}
                </button>
            </div>
        </motion.form>
    )
}
