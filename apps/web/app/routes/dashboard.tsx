import { motion } from "framer-motion";

import type { Route } from "./+types/dashboard";
import { DashboardHeader } from "../components/dashboard/dashboard-header";
import { useRequireAuth } from "~/hooks/use-require-auth";
import { useAuthStore } from "~/stores/auth.store";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard · Travix" }];
}

export default function Dashboard() {
  const isAuthenticated = useRequireAuth();
  const user = useAuthStore((s) => s.user);

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-5xl px-6 py-16 sm:px-10"
      >
        <h1 className="text-3xl font-bold text-primary">
          Welcome{user?.firstName ? `, ${user.firstName}` : ""}!
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          This is your travel dashboard. Start a new trip and Travix will craft
          a complete, personalized itinerary for you.
        </p>
      </motion.section>
    </main>
  );
}
