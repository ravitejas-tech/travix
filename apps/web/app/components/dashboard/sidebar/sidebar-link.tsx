import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router'

import type { NavItem } from '~/data/dashboard.constants'

interface SidebarLinkProps {
    item: NavItem
}

export function SidebarLink({ item }: SidebarLinkProps) {
    const { pathname } = useLocation()
    const isActive = item.path === '/dashboard' ? pathname === item.path : pathname.startsWith(item.path)
    const Icon = item.icon

    return (
        <Link
            to={item.path}
            className="group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200"
        >
            {isActive && (
                <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-primary/8 border border-primary/10 shadow-sm"
                    transition={{ type: 'spring', duration: 0.38, bounce: 0.12 }}
                />
            )}
            <span
                className={`relative z-10 flex items-center gap-3 w-full transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-muted group-hover:text-primary'
                }`}
            >
                <Icon
                    className={`h-[18px] w-[18px] transition-transform group-hover:scale-105 ${isActive ? 'text-primary' : 'text-muted/70 group-hover:text-primary'}`}
                />
                <span className="flex-1">{item.label}</span>
                {item.soon ? (
                    <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-accent">
                        Soon
                    </span>
                ) : (
                    isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                )}
            </span>
        </Link>
    )
}
