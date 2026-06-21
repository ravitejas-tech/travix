import { motion } from 'framer-motion'

interface AuthSubmitProps {
    label: string
    loading?: boolean
}

export function AuthSubmit({ label, loading = false }: AuthSubmitProps) {
    return (
        <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-black/20 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? 'Please wait…' : label}
        </motion.button>
    )
}
