import { NAV_LINKS } from '~/data/header.constants'

interface NavMenuProps {
    scrolled?: boolean
}

export function NavMenu({ scrolled = false }: NavMenuProps) {
    return (
        <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                        scrolled ? 'text-muted hover:text-primary' : 'text-white/80 hover:text-white'
                    }`}
                >
                    {link.label}
                </a>
            ))}
        </nav>
    )
}
