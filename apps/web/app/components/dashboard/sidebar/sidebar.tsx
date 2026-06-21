import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { NAV_ITEMS, SETTINGS_NAV_ITEM } from '~/data/dashboard.constants'
import { SidebarLink } from './sidebar-link'
import { SidebarProfile } from './sidebar-profile'

export function Sidebar() {
    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex h-full w-[272px] shrink-0 flex-col border-r border-slate-100 bg-white/80 backdrop-blur-md px-4 py-6"
        >
            <Link to="/dashboard" className="group mb-8 flex items-center gap-2 px-1" aria-label="Travix home">
                <img
                    src="/logo.png"
                    alt="Travix"
                    className="h-12 w-12 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-xl font-bold tracking-tight text-primary transition-colors group-hover:text-primary-dark">
                    Travix
                </span>
            </Link>

            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                    <SidebarLink key={item.path} item={item} />
                ))}
            </nav>

            <div className="mt-auto space-y-3 pt-6">
                <SidebarLink item={SETTINGS_NAV_ITEM} />
                <SidebarProfile />
            </div>
        </motion.aside>
    )
}
