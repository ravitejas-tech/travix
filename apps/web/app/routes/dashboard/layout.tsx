import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Outlet } from 'react-router'

import { MobileHeader } from '../../components/dashboard/mobile-header'
import { Sidebar } from '../../components/dashboard/sidebar'
import { useRequireAuth } from '~/hooks/use-require-auth'

export default function DashboardLayout() {
    const isAuthenticated = useRequireAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    if (!isAuthenticated) return null

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-40 bg-primary-dark/30 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
                            className="fixed inset-y-0 left-0 z-50 lg:hidden"
                        >
                            <Sidebar />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <MobileHeader sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
                <main className="flex-1 overflow-y-auto bg-slate-50/60">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
