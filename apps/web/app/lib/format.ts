export function formatMoney(amount: number | null | undefined, symbol = '$'): string {
    if (amount == null) return '—'
    return `${symbol}${Math.round(amount).toLocaleString()}`
}
