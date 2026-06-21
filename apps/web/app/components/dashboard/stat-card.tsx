import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  index: number;
}

const DESCRIPTIONS: Record<string, string> = {
  "Total Trips": "All planned journeys",
  "Active Trips": "Ready to travel",
  "Total Budget": "Accumulated cost",
  "Countries": "Different countries",
};

export function StatCard({ label, value, icon: Icon, color, index }: StatCardProps) {
  const [textColor, bgColor] = color.split(" ");

  // Custom shadows based on text colors
  const shadowColor = textColor.includes("sky")
    ? "hover:shadow-sky-500/10 hover:border-sky-200"
    : textColor.includes("emerald")
    ? "hover:shadow-emerald-500/10 hover:border-emerald-200"
    : textColor.includes("violet")
    ? "hover:shadow-violet-500/10 hover:border-violet-200"
    : "hover:shadow-amber-500/10 hover:border-amber-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3, scale: 1.01 }}
      className={`relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 ${shadowColor}`}
    >
      <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full ${bgColor} opacity-25 blur-xl`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${bgColor} ${textColor} relative overflow-hidden`}
          >
            <Icon className="h-5 w-5" />
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          </span>
          <span className="text-[10px] font-bold text-muted/60 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Live
          </span>
        </div>
        <p className="mt-4 text-2xl font-extrabold tracking-tight text-primary">{value}</p>
        <div className="mt-1">
          <p className="text-xs font-bold text-primary/80">{label}</p>
          <p className="text-[10px] text-muted/70">{DESCRIPTIONS[label] ?? "Calculated stats"}</p>
        </div>
      </div>
    </motion.div>
  );
}

