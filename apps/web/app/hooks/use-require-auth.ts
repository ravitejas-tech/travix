import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthStore } from '~/stores/auth.store'

export function useRequireAuth() {
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
        if (hasHydrated && !isAuthenticated) {
            navigate('/login', { replace: true })
        }
    }, [hasHydrated, isAuthenticated, navigate])

    return hasHydrated && isAuthenticated
}
