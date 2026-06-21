import { STATUS_META, type TripStatus } from "~/data/trip.constants";

interface StatusBadgeProps {
  status: TripStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const meta = STATUS_META[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}
    >
      {status === "generating" && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
      )}
      {meta.label}
    </span>
  );
}
