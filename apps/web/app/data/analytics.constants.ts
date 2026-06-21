import {
    Camera,
    Landmark,
    Leaf,
    Moon,
    Mountain,
    ShoppingBag,
    Sparkles,
    Utensils,
    type LucideIcon,
} from 'lucide-react'

import type { BudgetValue } from './trip.constants'

/** Card header gradients per budget tier, used by the recent-trips previews. */
export const BUDGET_HERO_GRADIENTS: Record<BudgetValue, string> = {
    low: 'from-emerald-500 to-teal-600',
    medium: 'from-sky-500 to-primary',
    high: 'from-violet-600 to-fuchsia-600',
}

/** Bar/dot colors and labels for the budget distribution chart. */
export const BUDGET_DISTRIBUTION_COLORS: Record<BudgetValue, { bar: string; dot: string; label: string }> = {
    low: { bar: 'bg-gradient-to-r from-emerald-400 to-teal-500', dot: 'bg-emerald-500', label: 'Economy Class' },
    medium: { bar: 'bg-gradient-to-r from-sky-400 to-primary', dot: 'bg-sky-500', label: 'Balanced Class' },
    high: { bar: 'bg-gradient-to-r from-violet-500 to-fuchsia-500', dot: 'bg-violet-500', label: 'Luxury Class' },
}

/** Per-interest label, icon and color treatment for the interest cloud. */
export const INTEREST_CLOUD_META: Record<string, { label: string; icon: LucideIcon; colors: string }> = {
    food: { label: 'Food', icon: Utensils, colors: 'bg-orange-50 border-orange-100 text-orange-700' },
    culture: { label: 'Culture', icon: Landmark, colors: 'bg-violet-50 border-violet-100 text-violet-700' },
    adventure: { label: 'Adventure', icon: Mountain, colors: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
    shopping: { label: 'Shopping', icon: ShoppingBag, colors: 'bg-rose-50 border-rose-100 text-rose-700' },
    sightseeing: { label: 'Sightseeing', icon: Camera, colors: 'bg-sky-50 border-sky-100 text-sky-700' },
    nature: { label: 'Nature', icon: Leaf, colors: 'bg-teal-50 border-teal-100 text-teal-700' },
    nightlife: { label: 'Nightlife', icon: Moon, colors: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
    relaxation: { label: 'Relaxation', icon: Sparkles, colors: 'bg-amber-50 border-amber-100 text-amber-700' },
}
