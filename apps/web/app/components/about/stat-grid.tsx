import { ABOUT_STATS } from '~/data/about.constants'

export function StatGrid() {
    return (
        <div className="grid grid-cols-2 gap-6 border-t border-primary/10 pt-6 sm:grid-cols-4">
            {ABOUT_STATS.map((stat) => (
                <div key={stat.label}>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}
