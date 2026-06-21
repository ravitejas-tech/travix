import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import type { V1TripsControllerDetailResponse } from "~/api";
import { Spinner } from "~/components/ui/spinner";
import { useRegenerateHotels } from "~/queries/hotels.query";
import { invalidateTrip } from "~/queries/trips.query";
import { HotelCard } from "./hotel-card";

interface HotelsListProps {
  tripId: string;
  hotels: V1TripsControllerDetailResponse["hotels"];
}

export function HotelsList({ tripId, hotels }: HotelsListProps) {
  const { mutate, isPending } = useRegenerateHotels();

  const regenerate = () =>
    mutate(
      { tripId },
      {
        onSuccess: () => {
          invalidateTrip(tripId);
          toast.success("Fresh hotel picks ready.");
        },
        onError: () => toast.error("Couldn't refresh hotels."),
      }
    );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">
          Places to stay, matched to your budget.
        </p>
        <button
          onClick={regenerate}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:border-primary/30 hover:text-primary disabled:opacity-60"
        >
          {isPending ? (
            <Spinner className="h-3.5 w-3.5" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          Refresh
        </button>
      </div>

      {hotels.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted">
          No hotel suggestions yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
