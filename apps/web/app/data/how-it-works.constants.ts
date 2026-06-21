import { CalendarDays, MapPin, Wallet } from "lucide-react";
import type { SampleDay, TripInput } from "~/types/content.types";

export const TRIP_INPUTS: TripInput[] = [
  { icon: MapPin, label: "Destination", value: "Tokyo" },
  { icon: CalendarDays, label: "Duration", value: "5 days" },
  { icon: Wallet, label: "Budget", value: "Medium" },
];

export const INTERESTS = [
  "Food",
  "Culture",
  "Adventure",
  "Nature",
  "Nightlife",
  "Shopping",
];

export const SAMPLE_DAYS: SampleDay[] = [
  { day: "Day 1", activity: "Senso-ji Temple & Asakusa" },
  { day: "Day 2", activity: "Tokyo Skytree & Akihabara" },
  { day: "Day 3", activity: "Day trip to Hakone" },
];
