import type { Route } from './+types/home'
import { BudgetOverview } from '../../components/dashboard/budget-overview'
import { DashboardHero } from '../../components/dashboard/dashboard-hero'
import { InlinePlanner } from '../../components/dashboard/inline-planner'
import { InterestCloud } from '../../components/dashboard/interest-cloud'
import { RecentTrips } from '../../components/dashboard/recent-trips'
import { StatsRow } from '../../components/dashboard/stats-row'
import { ErrorScreen } from '../../components/ui/error-screen'
import { LoadingScreen } from '../../components/ui/loading-screen'
import { useTrips } from '~/queries/trips.query'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Dashboard · Travix' }]
}

export default function DashboardHome() {
    const { data, isLoading, isError, refetch } = useTrips()
    const trips = data?.items ?? []

    if (isLoading) return <LoadingScreen message="Loading your dashboard…" />
    if (isError) return <ErrorScreen message="We couldn't load your dashboard." onRetry={refetch} />

    return (
        <div className="mx-auto max-w-5xl space-y-8 px-6 py-8 sm:px-8">
            <DashboardHero tripCount={trips.length} />

            {trips.length === 0 ? (
                <div className="space-y-6">
                    <div className="rounded-2xl bg-blue-50/40 border border-blue-100/50 p-4 text-sm text-primary flex items-start gap-2.5">
                        <span className="font-semibold text-accent">✨ Travel AI:</span>
                        <span>
                            Create a fully customized daily plan, hotel options, and budget breakdown in under 30
                            seconds. Try it below!
                        </span>
                    </div>
                    <InlinePlanner alwaysExpanded />
                </div>
            ) : (
                <>
                    <InlinePlanner />
                    <StatsRow trips={trips} />
                    <RecentTrips trips={trips} />
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <InterestCloud trips={trips} />
                        <BudgetOverview trips={trips} />
                    </div>
                </>
            )}
        </div>
    )
}
