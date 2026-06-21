import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthStore } from '~/stores/auth.store'

/**
 * Sends already-authenticated users to the dashboard. Use on public entry
 * pages (landing, login, register). Returns `true` while a redirect is pending
 * so the caller can render nothing instead of flashing the public page.
 */
export function useRedirectIfAuthenticated() {
    const navigate = useNavigate()
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const [hasHydrated, setHasHydrated] = useState(useAuthStore.persist.hasHydrated())

    useEffect(() => {
        if (useAuthStore.persist.hasHydrated()) {
            setHasHydrated(true)
            return
        }
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setHasHydrated(true)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (hasHydrated && isAuthenticated) {
            navigate('/dashboard', { replace: true })
        }
    }, [hasHydrated, isAuthenticated, navigate])

    return hasHydrated && isAuthenticated
}
