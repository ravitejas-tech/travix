import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Spinner } from "~/components/ui/spinner";
import { useRegenerateDay } from "~/queries/itinerary.query";
import { invalidateTrip } from "~/queries/trips.query";

interface RegenerateDayProps {
  tripId: string;
  dayId: string;
}

export function RegenerateDay({ tripId, dayId }: RegenerateDayProps) {
  const [open, setOpen] = useState(false);
  const [instructions, setInstructions] = useState("");
  const { mutate, isPending } = useRegenerateDay();

  const run = () => {
    mutate(
      { tripId, dayId, instructions: instructions.trim() || undefined },
      {
        onSuccess: () => {
          invalidateTrip(tripId);
          toast.success("Day regenerated.");
          setOpen(false);
          setInstructions("");
        },
        onError: () => toast.error("Couldn't regenerate this day."),
      }
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary/30 hover:text-primary disabled:opacity-60"
      >
        {isPending ? (
          <Spinner className="h-3.5 w-3.5" />
        ) : (
          <RefreshCw className="h-3.5 w-3.5" />
        )}
        Regenerate
      </button>

      <AnimatePresence>
        {open && !isPending && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-3 shadow-xl"
          >
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={3}
              placeholder="e.g. more outdoor activities"
              className="w-full resize-none rounded-lg border border-gray-200 p-2 text-xs text-primary outline-none focus:border-primary"
            />
            <button
              onClick={run}
              className="mt-2 w-full rounded-full bg-primary py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Regenerate day
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
