import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { TripHero } from '../../components/trip-detail/trip-hero'
import { TripStats } from '../../components/trip-detail/trip-stats'
import { TripTabs } from '../../components/trip-detail/trip-tabs'
import { ErrorScreen } from '../../components/ui/error-screen'
import { LoadingScreen } from '../../components/ui/loading-screen'
import { queryClient } from '~/lib/query-client'
import { useDeleteTrip, useTrip, useTrips } from '~/queries/trips.query'

export default function TripDetail() {
    const navigate = useNavigate()
    const { tripId = '' } = useParams()
    const {
        data: trip,
        isLoading,
        isError,
        refetch,
    } = useTrip({
        variables: { tripId },
    })
    const { mutate: deleteTrip, isPending: deleting } = useDeleteTrip()

    const handleDelete = () => {
        if (!window.confirm("Delete this trip? This can't be undone.")) return
        deleteTrip(
            { tripId },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: useTrips.getKey() })
                    toast.success('Trip deleted.')
                    navigate('/dashboard/trips')
                },
                onError: () => toast.error("Couldn't delete the trip."),
            },
        )
    }

    if (isLoading) return <LoadingScreen message="Loading your itinerary…" />
    if (isError || !trip) return <ErrorScreen message="We couldn't load this trip." onRetry={refetch} />

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-6 py-8 sm:px-8">
            <TripHero trip={trip} onDelete={handleDelete} deleting={deleting} />
            <TripStats trip={trip} />
            <TripTabs trip={trip} />
        </div>
    )
}
