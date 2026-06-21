import { motion } from "framer-motion";
import { Star } from "lucide-react";

import type { V1TripsControllerDetailResponse } from "~/api";
import { HOTEL_CATEGORY_META } from "~/data/trip.constants";

type Hotel = V1TripsControllerDetailResponse["hotels"][number];

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const meta = HOTEL_CATEGORY_META[hotel.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-primary">{hotel.name}</h4>
        {hotel.rating != null && (
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            {hotel.rating.toFixed(1)}
          </span>
        )}
      </div>
      <span
        className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.className}`}
      >
        {meta.label}
      </span>
      {hotel.description && (
        <p className="text-sm text-muted">{hotel.description}</p>
      )}
    </motion.div>
  );
}
