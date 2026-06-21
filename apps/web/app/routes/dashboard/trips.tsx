import { MapPinned, Plus, SearchX } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'

import type { Route } from './+types/trips'
import { TripsGrid } from '../../components/dashboard/trips-grid'
import { TripsSearch } from '../../components/dashboard/trips-search'
import { TripsSort } from '../../components/dashboard/trips-sort'
import { ErrorScreen } from '../../components/ui/error-screen'
import { LoadingScreen } from '../../components/ui/loading-screen'
import type { TripSortValue } from '~/data/trip.constants'
import { useDebounce } from '~/hooks/use-debounce'
import { queryClient } from '~/lib/query-client'
import { useDeleteTrip, useTrips } from '~/queries/trips.query'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'My Trips · Travix' }]
}

export default function TripsPage() {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState<TripSortValue>('recent')
    const debouncedSearch = useDebounce(search.trim(), 350)
    const { data, isLoading, isError, refetch } = useTrips({ variables: { search: debouncedSearch, sort } })
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
    const isSearching = debouncedSearch.length > 0

    if (isLoading) return <LoadingScreen message="Loading your trips…" />
    if (isError) return <ErrorScreen message="We couldn't load your trips." onRetry={refetch} />

    return (
        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-primary">My Trips</h1>
                    <p className="mt-1 text-sm text-muted">
                        {trips.length > 0
                            ? `${trips.length} trip${trips.length > 1 ? 's' : ''}${isSearching ? ' found' : ' planned'}`
                            : isSearching
                              ? 'No matches.'
                              : 'No trips planned yet.'}
                    </p>
                </div>
                <Link
                    to="/dashboard"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:brightness-110 active:scale-95"
                >
                    <Plus className="h-4 w-4" /> Plan a trip
                </Link>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1 sm:max-w-md">
                    <TripsSearch value={search} onChange={setSearch} />
                </div>
                <TripsSort value={sort} onChange={setSort} />
            </div>

            <div className="mt-6">
                {trips.length > 0 ? (
                    <TripsGrid
                        trips={trips}
                        onDelete={handleDelete}
                        deletingId={isPending ? (variables?.tripId ?? null) : null}
                    />
                ) : isSearching ? (
                    <EmptyState
                        icon={SearchX}
                        title={`No trips match "${debouncedSearch}"`}
                        body="Try a different city or country name."
                    />
                ) : (
                    <EmptyState
                        icon={MapPinned}
                        title="No trips yet"
                        body="You haven't planned any travel yet. Start your first AI itinerary from the Plan tab."
                        action={
                            <Link
                                to="/dashboard"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:brightness-110 active:scale-95"
                            >
                                <Plus className="h-4 w-4" /> Plan a trip
                            </Link>
                        }
                    />
                )}
            </div>
        </div>
    )
}

function EmptyState({
    icon: Icon,
    title,
    body,
    action,
}: {
    icon: typeof MapPinned
    title: string
    body: string
    action?: React.ReactNode
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-7 w-7" />
            </span>
            <h2 className="text-lg font-bold text-primary">{title}</h2>
            <p className="mt-1.5 max-w-sm text-sm text-muted">{body}</p>
            {action}
        </div>
    )
}
