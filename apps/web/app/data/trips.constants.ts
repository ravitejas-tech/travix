import type { BudgetValue } from './trip.constants'

/** Card header gradients per budget tier, used by the trips grid cards. */
export const BUDGET_CARD_GRADIENTS: Record<BudgetValue, string> = {
    low: 'from-emerald-400 to-teal-500',
    medium: 'from-sky-400 to-primary',
    high: 'from-violet-500 to-fuchsia-500',
}
