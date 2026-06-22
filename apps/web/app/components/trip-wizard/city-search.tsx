import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Search } from 'lucide-react'
import { useState } from 'react'

import { MIN_SEARCH_LENGTH } from '~/data/trip-wizard.constants'
import { useDebounce } from '~/hooks/use-debounce'
import { useSearchCities } from '~/queries/locations.query'

interface CitySearchProps {
    value: string
    onSelect: (cityId: string, label: string) => void
    placeholder?: string
}

export function CitySearch({ value, onSelect, placeholder }: CitySearchProps) {
    const [term, setTerm] = useState(value)
    const [open, setOpen] = useState(false)
    const search = useDebounce(term.trim(), 300)

    const { data, isFetching } = useSearchCities({
        variables: { search },
        enabled: search.length >= MIN_SEARCH_LENGTH,
    })

    const handlePick = (cityId: string, label: string) => {
        onSelect(cityId, label)
        setTerm(label)
        setOpen(false)
    }

    return (
        <div className="relative">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-primary">
                <Search className="h-4 w-4 text-muted" />
                <input
                    value={term}
                    onChange={(e) => {
                        setTerm(e.target.value)
                        setOpen(true)
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder ?? 'Search a city, e.g. Tokyo'}
                    className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted/60"
                />
            </div>

            <AnimatePresence>
                {open && search.length >= MIN_SEARCH_LENGTH && (
                    <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-gray-100 bg-white p-1 shadow-xl"
                    >
                        {isFetching && <li className="px-3 py-2 text-sm text-muted">Searching…</li>}
                        {!isFetching && data?.items.length === 0 && (
                            <li className="px-3 py-2 text-sm text-muted">No cities found.</li>
                        )}
                        {data?.items.map((city) => (
                            <li key={city.id}>
                                <button
                                    type="button"
                                    onClick={() => handlePick(city.id, `${city.name}, ${city.countryName}`)}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-primary/5"
                                >
                                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                                    <span>
                                        {city.name}
                                        <span className="text-muted">, {city.countryName}</span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}
