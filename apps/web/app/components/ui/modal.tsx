import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'

interface ModalProps {
    open: boolean
    onClose: () => void
    children: ReactNode
    /** Tailwind max-width class, e.g. "max-w-lg" */
    maxWidth?: string
}

export function Modal({ open, onClose, children, maxWidth = 'max-w-lg' }: ModalProps) {
    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onClose])

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 16 }}
                        transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                        className={`relative z-10 w-full ${maxWidth} overflow-hidden rounded-3xl bg-background shadow-2xl shadow-black/20`}
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-4 top-4 z-20 rounded-full p-1.5 text-muted transition-colors hover:bg-gray-100 hover:text-primary"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
