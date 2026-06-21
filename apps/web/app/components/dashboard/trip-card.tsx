import { motion } from "framer-motion";
import { CalendarDays, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router";

import type { V1TripsControllerListResponse } from "~/api";
import { BUDGET_LABEL, type BudgetValue } from "~/data/trip.constants";
import { formatMoney } from "~/lib/format";
import { StatusBadge } from "./status-badge";

type Trip = V1TripsControllerListResponse["items"][number];

const GRADIENTS: Record<BudgetValue, string> = {
  low: "from-emerald-400 to-teal-500",
  medium: "from-sky-400 to-primary",
  high: "from-violet-500 to-fuchsia-500",
};

interface TripCardProps {
  trip: Trip;
  onDelete: (tripId: string) => void;
  deleting: boolean;
}

export function TripCard({ trip, onDelete, deleting }: TripCardProps) {
  const tags = trip.interests.slice(0, 3);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/10"
    >
      <Link to={`/dashboard/trips/${trip.id}`} className="block">
        <div
          className={`relative h-28 bg-gradient-to-br ${GRADIENTS[trip.budgetType]} p-4`}
        >
          <div className="absolute right-3 top-3">
            <StatusBadge status={trip.status} />
          </div>
          <div className="absolute bottom-3 left-4 text-white">
            <p className="flex items-center gap-1 text-xs font-medium text-white/80">
              <MapPin className="h-3.5 w-3.5" /> {trip.destination.countryName}
            </p>
            <h3 className="text-xl font-bold leading-tight drop-shadow-sm">
              {trip.destination.cityName}
            </h3>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <CalendarDays className="h-4 w-4 text-primary" />
              {trip.numberOfDays} days · {BUDGET_LABEL[trip.budgetType]}
            </span>
            <span className="text-sm font-semibold text-primary">
              {formatMoney(trip.total)}
            </span>
          </div>
          {tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium capitalize text-muted"
                >
                  {tag}
                </span>
              ))}
              {trip.interests.length > 3 && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-muted">
                  +{trip.interests.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={() => onDelete(trip.id)}
        disabled={deleting}
        aria-label="Delete trip"
        className="absolute bottom-3 right-3 rounded-full bg-white/0 p-2 text-muted opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
