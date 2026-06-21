import { motion } from "framer-motion";
import { Bed, Plane, Ticket, Utensils, type LucideIcon } from "lucide-react";

import type { V1TripsControllerDetailResponse } from "~/api";
import { formatMoney } from "~/lib/format";

type Budget = NonNullable<V1TripsControllerDetailResponse["budget"]>;

const ROWS: { key: keyof Budget; label: string; icon: LucideIcon }[] = [
  { key: "flights", label: "Flights", icon: Plane },
  { key: "accommodation", label: "Accommodation", icon: Bed },
  { key: "food", label: "Food", icon: Utensils },
  { key: "activities", label: "Activities", icon: Ticket },
];

interface BudgetBreakdownProps {
  budget: Budget | null | undefined;
}

export function BudgetBreakdown({ budget }: BudgetBreakdownProps) {
  if (!budget) {
    return (
      <p className="py-12 text-center text-sm text-muted">
        No budget estimate available.
      </p>
    );
  }

  const symbol = budget.currencySymbol;

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3">
        {ROWS.map((row, i) => {
          const value = budget[row.key] as number | null | undefined;
          const pct = budget.total ? ((value ?? 0) / budget.total) * 100 : 0;
          const Icon = row.icon;
          return (
            <div key={row.key} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{row.label}</span>
                  <span className="font-medium text-primary">
                    {formatMoney(value, symbol)}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-sm font-semibold text-primary">Total</span>
        <span className="text-2xl font-bold text-primary">
          {formatMoney(budget.total, symbol)}
        </span>
      </div>
    </div>
  );
}
