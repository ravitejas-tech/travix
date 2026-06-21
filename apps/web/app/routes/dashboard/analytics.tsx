import { LineChart } from 'lucide-react'
import { Link } from 'react-router'

import type { Route } from './+types/analytics'
import { BudgetOverview } from '../../components/dashboard/budget-overview'
import { InterestCloud } from '../../components/dashboard/interest-cloud'
import { RecentTrips } from '../../components/dashboard/recent-trips'
import { StatsRow } from '../../components/dashboard/stats-row'
import { ErrorScreen } from '../../components/ui/error-screen'
import { LoadingScreen } from '../../components/ui/loading-screen'
import { useTrips } from '~/queries/trips.query'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Analytics · Travix' }]
}

export default function AnalyticsPage() {
    const { data, isLoading, isError, refetch } = useTrips()
    const trips = data?.items ?? []

    if (isLoading) return <LoadingScreen message="Crunching your travel stats…" />
    if (isError) return <ErrorScreen message="We couldn't load your analytics." onRetry={refetch} />

    return (
        <div className="mx-auto max-w-5xl space-y-8 px-6 py-8 sm:px-8">
            <header>
                <h1 className="text-2xl font-bold tracking-tight text-primary">Analytics</h1>
                <p className="mt-1 text-sm text-muted">A snapshot of your travel planning across all trips.</p>
            </header>

            {trips.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                    <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <LineChart className="h-7 w-7" />
                    </span>
                    <h2 className="text-lg font-bold text-primary">No data yet</h2>
                    <p className="mt-1.5 max-w-sm text-sm text-muted">
                        Plan your first trip and your stats, budget mix and interests will show up here.
                    </p>
                    <Link
                        to="/dashboard"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:brightness-110 active:scale-95"
                    >
                        Plan a trip
                    </Link>
                </div>
            ) : (
                <>
                    <StatsRow trips={trips} />
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <InterestCloud trips={trips} />
                        <BudgetOverview trips={trips} />
                    </div>
                    <RecentTrips trips={trips} />
                </>
            )}
        </div>
    )
}
