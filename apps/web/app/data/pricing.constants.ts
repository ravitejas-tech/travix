import type { PricingPlan } from "~/types/content.types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Explorer",
    price: "$0",
    cadence: "forever",
    description: "For the occasional getaway.",
    cta: "Start free",
    features: ["3 trips per month", "Day-by-day itineraries", "Budget estimates"],
  },
  {
    name: "Voyager",
    price: "$12",
    cadence: "month",
    description: "For the frequent traveler.",
    cta: "Go Voyager",
    featured: true,
    features: [
      "Unlimited trips",
      "Regenerate any day",
      "Hotel recommendations",
      "Priority AI planning",
    ],
  },
  {
    name: "Pioneer",
    price: "$29",
    cadence: "month",
    description: "For teams and creators.",
    cta: "Go Pioneer",
    features: [
      "Everything in Voyager",
      "Collaborative trips",
      "Export to PDF",
      "Early access features",
    ],
  },
];
