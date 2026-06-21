import { Globe, LayoutDashboard, Map, Plane, TrendingUp, Wallet, type LucideIcon } from 'lucide-react'

export interface NavItem {
    label: string
    path: string
    icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Trips', path: '/dashboard/trips', icon: Map },
]

export interface StatDefinition {
    key: string
    label: string
    icon: LucideIcon
    color: string
}

export const STAT_DEFINITIONS: StatDefinition[] = [
    { key: 'totalTrips', label: 'Total Trips', icon: Plane, color: 'text-sky-500 bg-sky-50' },
    { key: 'activeTrips', label: 'Active Trips', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50' },
    { key: 'totalBudget', label: 'Total Budget', icon: Wallet, color: 'text-violet-500 bg-violet-50' },
    { key: 'countries', label: 'Countries', icon: Globe, color: 'text-amber-500 bg-amber-50' },
]
