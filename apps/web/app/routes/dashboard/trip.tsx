import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { TripContent } from "../../components/trip-detail/trip-content";
import { TripSidebar } from "../../components/trip-detail/trip-sidebar";
import { ErrorScreen } from "../../components/ui/error-screen";
import { LoadingScreen } from "../../components/ui/loading-screen";
import { queryClient } from "~/lib/query-client";
import { useDeleteTrip, useTrip, useTrips } from "~/queries/trips.query";

export default function TripDetail() {
  const navigate = useNavigate();
  const { tripId = "" } = useParams();
  const { data: trip, isLoading, isError, refetch } = useTrip({
    variables: { tripId },
  });
  const { mutate: deleteTrip, isPending: deleting } = useDeleteTrip();

  const handleDelete = () => {
    if (!window.confirm("Delete this trip? This can't be undone.")) return;
    deleteTrip(
      { tripId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: useTrips.getKey() });
          toast.success("Trip deleted.");
          navigate("/dashboard/trips");
        },
        onError: () => toast.error("Couldn't delete the trip."),
      }
    );
  };

  if (isLoading) return <LoadingScreen message="Loading your itinerary…" />;
  if (isError || !trip)
    return (
      <ErrorScreen message="We couldn't load this trip." onRetry={refetch} />
    );

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 min-w-0">
          <TripContent trip={trip} />
        </div>
        <div className="w-full lg:w-72 shrink-0">
          <TripSidebar trip={trip} onDelete={handleDelete} deleting={deleting} />
        </div>
      </div>
    </div>
  );
}
