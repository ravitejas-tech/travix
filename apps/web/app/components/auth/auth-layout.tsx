import { motion } from 'framer-motion'
import { Link } from 'react-router'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
    title: string
    subtitle: string
    children: ReactNode
    footer: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
            <img src="/images/auth/auth.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-primary-dark/50" />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10"
            >
                <Link to="/" className="flex justify-center" aria-label="Travix home">
                    <img src="/logo.png" alt="Travix" className="h-16 w-16 object-contain drop-shadow-lg" />
                </Link>

                <div className="mt-4 text-center">
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    <p className="mt-2 text-sm text-white/70">{subtitle}</p>
                </div>

                <div className="mt-8">{children}</div>
                <div className="mt-6 text-center text-sm text-white/70">{footer}</div>
            </motion.div>
        </main>
    )
}
