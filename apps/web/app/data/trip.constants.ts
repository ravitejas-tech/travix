import {
  Camera,
  Compass,
  Gem,
  Landmark,
  Leaf,
  Moon,
  Mountain,
  ShoppingBag,
  Sparkles,
  Utensils,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type BudgetValue = "low" | "medium" | "high";
export type ActivityTypeValue =
  | "food"
  | "culture"
  | "adventure"
  | "shopping"
  | "sightseeing"
  | "other";
export type TripStatus = "draft" | "generating" | "active" | "archived";
export type HotelCategory = "budget" | "mid_range" | "luxury";

export const ACTIVITY_TYPE_META: Record<
  ActivityTypeValue,
  { label: string; icon: LucideIcon }
> = {
  food: { label: "Food", icon: Utensils },
  culture: { label: "Culture", icon: Landmark },
  adventure: { label: "Adventure", icon: Mountain },
  shopping: { label: "Shopping", icon: ShoppingBag },
  sightseeing: { label: "Sightseeing", icon: Camera },
  other: { label: "Other", icon: Compass },
};

export const INTEREST_OPTIONS: {
  value: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { value: "food", label: "Food", icon: Utensils },
  { value: "culture", label: "Culture", icon: Landmark },
  { value: "adventure", label: "Adventure", icon: Mountain },
  { value: "shopping", label: "Shopping", icon: ShoppingBag },
  { value: "sightseeing", label: "Sightseeing", icon: Camera },
  { value: "nature", label: "Nature", icon: Leaf },
  { value: "nightlife", label: "Nightlife", icon: Moon },
  { value: "relaxation", label: "Relaxation", icon: Sparkles },
];

export const BUDGET_OPTIONS: {
  value: BudgetValue;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "low",
    label: "Budget",
    description: "Hostels & street food",
    icon: Wallet,
  },
  {
    value: "medium",
    label: "Balanced",
    description: "Mid-range stays & dining",
    icon: Compass,
  },
  {
    value: "high",
    label: "Luxury",
    description: "Premium hotels & experiences",
    icon: Gem,
  },
];

export const STATUS_META: Record<
  TripStatus,
  { label: string; className: string }
> = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-600" },
  generating: { label: "Generating", className: "bg-amber-100 text-amber-700" },
  active: { label: "Ready", className: "bg-emerald-100 text-emerald-700" },
  archived: { label: "Archived", className: "bg-gray-100 text-gray-500" },
};

export const HOTEL_CATEGORY_META: Record<
  HotelCategory,
  { label: string; className: string }
> = {
  budget: { label: "Budget", className: "bg-emerald-50 text-emerald-700" },
  mid_range: { label: "Mid-range", className: "bg-sky-50 text-sky-700" },
  luxury: { label: "Luxury", className: "bg-violet-50 text-violet-700" },
};

export const BUDGET_LABEL: Record<BudgetValue, string> = {
  low: "Budget",
  medium: "Balanced",
  high: "Luxury",
};
