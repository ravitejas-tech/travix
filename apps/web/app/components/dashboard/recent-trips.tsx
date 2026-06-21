import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Flag, PlaneTakeoff } from "lucide-react";
import { Link } from "react-router";

import type { V1TripsControllerListResponse } from "~/api";
import { BUDGET_LABEL, type BudgetValue } from "~/data/trip.constants";
import { formatMoney } from "~/lib/format";
import { StatusBadge } from "./status-badge";

const GRADIENTS: Record<BudgetValue, string> = {
  low: "from-emerald-500 to-teal-600",
  medium: "from-sky-500 to-primary",
  high: "from-violet-600 to-fuchsia-600",
};

interface RecentTripsProps {
  trips: V1TripsControllerListResponse["items"];
}

export function RecentTrips({ trips }: RecentTripsProps) {
  const recent = trips.slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-primary tracking-tight">Recent Trips</h2>
          <p className="text-xs text-muted/80">Manage your recently planned itineraries.</p>
        </div>
        <Link
          to="/dashboard/trips"
          className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs font-bold text-muted transition-all hover:border-primary/30 hover:text-primary hover:shadow-sm"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((trip, i) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <Link
              to={`/dashboard/trips/${trip.id}`}
              className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              <div className={`h-24 bg-gradient-to-br ${GRADIENTS[trip.budgetType]} p-4 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="text-white">
                    <p className="flex items-center gap-1 text-[10px] font-bold text-white/80 uppercase tracking-wider">
                      <MapPin className="h-3 w-3" /> {trip.destination.countryName}
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold drop-shadow-sm leading-tight">
                      {trip.destination.cityName}
                    </h3>
                  </div>
                  <StatusBadge status={trip.status} />
                </div>
              </div>

              {/* Simulated Mini Timeline Preview */}
              <div className="px-4 pt-4 pb-2 border-b border-slate-50 bg-slate-50/20">
                <div className="relative flex items-center justify-between px-2">
                  <div className="absolute left-3 right-3 top-1.5 h-0.5 border-t border-dashed border-slate-200" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white bg-primary shadow-sm flex items-center justify-center">
                      <PlaneTakeoff className="h-2 w-2 text-white" />
                    </div>
                    <span className="mt-1 text-[9px] font-bold text-muted/70">Start</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-3.5 w-3.5 rounded-full border border-slate-100 bg-white shadow-sm flex items-center justify-center">
                      <span className="text-[8px] font-extrabold text-primary">{trip.numberOfDays}d</span>
                    </div>
                    <span className="mt-1 text-[9px] font-bold text-muted/70">Duration</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white bg-accent shadow-sm flex items-center justify-center">
                      <Flag className="h-2 w-2 text-white" />
                    </div>
                    <span className="mt-1 text-[9px] font-bold text-muted/70">Arrive</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-muted/80">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {BUDGET_LABEL[trip.budgetType]} Class
                </span>
                <span className="text-sm font-extrabold text-primary">
                  {formatMoney(trip.total)}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

