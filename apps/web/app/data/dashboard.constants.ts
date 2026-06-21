import {
    Compass,
    Globe,
    LineChart,
    Map,
    MessageSquarePlus,
    Plane,
    Settings,
    Ticket,
    TrendingUp,
    Users,
    Wallet,
    type LucideIcon,
} from 'lucide-react'

export interface NavItem {
    label: string
    path: string
    icon: LucideIcon
    soon?: boolean
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'Plan', path: '/dashboard', icon: MessageSquarePlus },
    { label: 'Analytics', path: '/dashboard/analytics', icon: LineChart },
    { label: 'My Trips', path: '/dashboard/trips', icon: Map },
    { label: 'Bookings', path: '/dashboard/bookings', icon: Ticket, soon: true },
    { label: 'Community', path: '/dashboard/community', icon: Users, soon: true },
    { label: 'Explore', path: '/dashboard/explore', icon: Compass, soon: true },
]

export const SETTINGS_NAV_ITEM: NavItem = {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
    soon: true,
}

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
