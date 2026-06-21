import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'

interface MobileHeaderProps {
    sidebarOpen: boolean
    onToggle: () => void
}

export function MobileHeader({ sidebarOpen, onToggle }: MobileHeaderProps) {
    return (
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur lg:hidden">
            <Link to="/dashboard" className="flex items-center gap-2">
                <img src="/logo.png" alt="Travix" className="h-8 w-8 object-contain" />
                <span className="text-lg font-bold text-primary">Travix</span>
            </Link>
            <button
                onClick={onToggle}
                aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-gray-100 hover:text-primary"
            >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
        </header>
    )
}
