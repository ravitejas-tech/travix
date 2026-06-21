import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { clearToken } from '~/lib/token'
import type { V1AuthControllerMeResponse } from '~/api'

interface AuthState {
    user: V1AuthControllerMeResponse | null
    isAuthenticated: boolean
    setUser: (user: V1AuthControllerMeResponse) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user) => set({ user, isAuthenticated: true }),
            logout: () => {
                clearToken()
                set({ user: null, isAuthenticated: false })
            },
        }),
        { name: 'travix-auth' },
    ),
)
