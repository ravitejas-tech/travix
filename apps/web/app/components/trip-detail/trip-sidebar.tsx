import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, MapPin, Trash2, Wallet } from "lucide-react";
import { Link } from "react-router";

import type { V1TripsControllerDetailResponse } from "~/api";
import { StatusBadge } from "~/components/dashboard/status-badge";
import { BUDGET_LABEL } from "~/data/trip.constants";
import { formatMoney } from "~/lib/format";

interface TripSidebarProps {
  trip: V1TripsControllerDetailResponse;
  onDelete: () => void;
  deleting: boolean;
}

export function TripSidebar({ trip, onDelete, deleting }: TripSidebarProps) {
  const symbol = trip.budget?.currencySymbol ?? "$";

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className="sticky top-8 space-y-5"
    >
      <Link
        to="/dashboard/trips"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to trips
      </Link>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-primary">
            {trip.destination.cityName}
          </h2>
          <StatusBadge status={trip.status} />
        </div>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5" /> {trip.destination.countryName}
        </p>

        <div className="mt-5 space-y-3">
          <InfoRow icon={CalendarDays} label="Duration" value={`${trip.numberOfDays} days`} />
          <InfoRow icon={Wallet} label="Budget" value={BUDGET_LABEL[trip.budgetType]} />
          {trip.total != null && (
            <InfoRow icon={Wallet} label="Estimated" value={formatMoney(trip.total, symbol)} />
          )}
        </div>
      </div>

      {trip.interests.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Interests
          </p>
          <div className="flex flex-wrap gap-1.5">
            {trip.interests.map((i) => (
              <span
                key={i}
                className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium capitalize text-primary"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onDelete}
        disabled={deleting}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
        {deleting ? "Deleting…" : "Delete trip"}
      </button>
    </motion.div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-muted">
        <Icon className="h-4 w-4 text-primary/60" /> {label}
      </span>
      <span className="font-medium text-primary">{value}</span>
    </div>
  );
}
