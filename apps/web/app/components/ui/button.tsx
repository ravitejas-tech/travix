import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "solid";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
}

const STYLES: Record<Variant, string> = {
  primary:
    "bg-white text-primary shadow-lg shadow-black/20 hover:bg-gray-100",
  ghost:
    "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
  solid:
    "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark",
};

export function Button({ children, variant = "primary", onClick }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${STYLES[variant]}`}
    >
      {children}
    </motion.button>
  );
}
