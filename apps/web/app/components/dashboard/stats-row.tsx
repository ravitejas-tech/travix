import { useMemo } from "react";

import type { V1TripsControllerListResponse } from "~/api";
import { STAT_DEFINITIONS } from "~/data/dashboard.constants";
import { formatMoney } from "~/lib/format";
import { StatCard } from "./stat-card";

interface StatsRowProps {
  trips: V1TripsControllerListResponse["items"];
}

export function StatsRow({ trips }: StatsRowProps) {
  const stats = useMemo(() => {
    const totalTrips = trips.length;
    const activeTrips = trips.filter((t) => t.status === "active").length;
    const totalBudget = trips.reduce((sum, t) => sum + (t.total ?? 0), 0);
    const countries = new Set(trips.map((t) => t.destination.countryName)).size;

    return {
      totalTrips: String(totalTrips),
      activeTrips: String(activeTrips),
      totalBudget: formatMoney(totalBudget),
      countries: String(countries),
    };
  }, [trips]);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STAT_DEFINITIONS.map((def, i) => (
        <StatCard
          key={def.key}
          label={def.label}
          value={stats[def.key as keyof typeof stats]}
          icon={def.icon}
          color={def.color}
          index={i}
        />
      ))}
    </div>
  );
}
