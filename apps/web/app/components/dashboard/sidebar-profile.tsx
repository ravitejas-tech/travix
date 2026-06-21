import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'

import { useAuthStore } from '~/stores/auth.store'

export function SidebarProfile() {
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    const initial = (user?.firstName ?? user?.email ?? 'T').charAt(0).toUpperCase()
    const displayName = user?.firstName ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}` : 'Traveler'

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-gradient-to-tr from-slate-50 to-white p-3.5 shadow-sm shadow-slate-100/50">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-md shadow-primary/25 relative overflow-hidden">
                <span className="relative z-10">{initial}</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold tracking-tight text-primary">{displayName}</p>
                <p className="truncate text-xs text-muted/80 font-medium">{user?.email}</p>
            </div>
            <button
                onClick={handleLogout}
                aria-label="Log out"
                className="rounded-xl p-2 text-muted/60 transition-all hover:bg-red-50 hover:text-red-500 hover:scale-105 active:scale-95"
            >
                <LogOut className="h-4 w-4" />
            </button>
        </div>
    )
}
