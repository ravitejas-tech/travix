const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export interface TokenPair {
    access: string
    refresh: string
}

export function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setToken({ access, refresh }: TokenPair): void {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(ACCESS_TOKEN_KEY, access)
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

export function clearToken(): void {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}
