import { motion } from "framer-motion";

import { useAuthStore } from "~/stores/auth.store";

interface DashboardHeroProps {
  tripCount: number;
}

export function DashboardHero({ tripCount }: DashboardHeroProps) {
  const user = useAuthStore((s) => s.user);
  const name = user?.firstName ?? "traveler";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-primary p-6 text-white sm:p-8"
    >
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-accent/15 blur-2xl" />
      <div className="relative z-10">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back, {name} 👋
        </h1>
        <p className="mt-2 max-w-md text-white/70 text-sm">
          {tripCount > 0
            ? `You have ${tripCount} trip${tripCount > 1 ? "s" : ""} planned. Here's your travel overview.`
            : "Ready to plan your next adventure? Use the trip planner below to get started."}
        </p>
      </div>
    </motion.div>
  );
}
