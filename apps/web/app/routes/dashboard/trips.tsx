import { toast } from 'sonner'

import type { Route } from './+types/trips'
import { InlinePlanner } from '../../components/dashboard/inline-planner'
import { TripsGrid } from '../../components/dashboard/trips-grid'
import { ErrorScreen } from '../../components/ui/error-screen'
import { LoadingScreen } from '../../components/ui/loading-screen'
import { queryClient } from '~/lib/query-client'
import { useDeleteTrip, useTrips } from '~/queries/trips.query'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'My Trips · Travix' }]
}

export default function TripsPage() {
    const { data, isLoading, isError, refetch } = useTrips()
    const { mutate: deleteTrip, variables, isPending } = useDeleteTrip()

    const handleDelete = (tripId: string) => {
        if (!window.confirm("Delete this trip? This can't be undone.")) return
        deleteTrip(
            { tripId },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: useTrips.getKey() })
                    toast.success('Trip deleted.')
                },
                onError: () => toast.error("Couldn't delete the trip."),
            },
        )
    }

    const trips = data?.items ?? []

    if (isLoading) return <LoadingScreen message="Loading your trips…" />
    if (isError) return <ErrorScreen message="We couldn't load your trips." onRetry={refetch} />

    return (
        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary">My Trips</h1>
                <p className="mt-1 text-sm text-muted">
                    {trips.length > 0
                        ? `${trips.length} trip${trips.length > 1 ? 's' : ''} planned`
                        : 'No trips planned yet.'}
                </p>
            </div>

            {trips.length === 0 ? (
                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 py-8 text-center max-w-md mx-auto">
                        <h3 className="text-base font-bold text-primary">No trips found</h3>
                        <p className="mt-1.5 text-xs text-muted/80">
                            You haven't scheduled any travel yet. Start by generating your first adventure with AI
                            below.
                        </p>
                    </div>
                    <InlinePlanner alwaysExpanded />
                </div>
            ) : (
                <TripsGrid
                    trips={trips}
                    onDelete={handleDelete}
                    deletingId={isPending ? (variables?.tripId ?? null) : null}
                />
            )}
        </div>
    )
}
