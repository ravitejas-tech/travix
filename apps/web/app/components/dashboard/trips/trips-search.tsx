import { Search, X } from 'lucide-react'

interface TripsSearchProps {
    value: string
    onChange: (value: string) => void
}

export function TripsSearch({ value, onChange }: TripsSearchProps) {
    return (
        <div className="relative flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-primary/40">
            <Search className="h-4 w-4 shrink-0 text-muted" />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search by city or country…"
                className="min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-muted/60"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    aria-label="Clear search"
                    className="rounded-lg p-1 text-muted/60 transition-colors hover:bg-slate-100 hover:text-primary"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    )
}
