import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { EASE_OUT } from "../ui/reveal";
import type { Destination } from "~/types/content.types";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className = "" }: DestinationCardProps) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={`group relative block overflow-hidden rounded-3xl ${className}`}
    >
      <img
        src={destination.image}
        alt={`${destination.name}, ${destination.country}`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-secondary">
        <p className="flex items-center gap-1 text-xs text-white/70">
          <MapPin className="h-3 w-3" />
          {destination.country}
        </p>
        <h3 className="mt-0.5 text-xl font-semibold">{destination.name}</h3>
        <p className="text-sm text-white/80">{destination.tagline}</p>
      </div>
    </motion.a>
  );
}
