import { motion } from "framer-motion";
import {
  Camera,
  Compass,
  Landmark,
  Leaf,
  Moon,
  Mountain,
  ShoppingBag,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

import type { V1TripsControllerListResponse } from "~/api";

interface InterestCloudProps {
  trips: V1TripsControllerListResponse["items"];
}

const INTEREST_META: Record<
  string,
  { label: string; icon: LucideIcon; colors: string }
> = {
  food: { label: "Food", icon: Utensils, colors: "bg-orange-50 border-orange-100 text-orange-700" },
  culture: { label: "Culture", icon: Landmark, colors: "bg-violet-50 border-violet-100 text-violet-700" },
  adventure: { label: "Adventure", icon: Mountain, colors: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  shopping: { label: "Shopping", icon: ShoppingBag, colors: "bg-rose-50 border-rose-100 text-rose-700" },
  sightseeing: { label: "Sightseeing", icon: Camera, colors: "bg-sky-50 border-sky-100 text-sky-700" },
  nature: { label: "Nature", icon: Leaf, colors: "bg-teal-50 border-teal-100 text-teal-700" },
  nightlife: { label: "Nightlife", icon: Moon, colors: "bg-indigo-50 border-indigo-100 text-indigo-700" },
  relaxation: { label: "Relaxation", icon: Sparkles, colors: "bg-amber-50 border-amber-100 text-amber-700" },
};

export function InterestCloud({ trips }: InterestCloudProps) {
  const interests = useMemo(() => {
    const map = new Map<string, number>();
    for (const trip of trips) {
      for (const interest of trip.interests) {
        map.set(interest, (map.get(interest) ?? 0) + 1);
      }
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [trips]);

  if (interests.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-100/50"
    >
      <div className="mb-4">
        <h2 className="text-base font-bold text-primary tracking-tight">Your Interests</h2>
        <p className="text-xs text-muted/80">Themes from your planned itineraries.</p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {interests.map(([name, count], i) => {
          const meta = INTEREST_META[name] || {
            label: name,
            icon: Compass,
            colors: "bg-slate-50 border-slate-100 text-slate-700",
          };
          const Icon = meta.icon;

          return (
            <motion.span
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.05 }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize shadow-sm transition-all hover:scale-105 ${meta.colors}`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{meta.label}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/75 text-[10px] font-extrabold shadow-sm border border-black/5">
                {count}
              </span>
            </motion.span>
          );
        })}
      </div>
    </motion.section>
  );
}

