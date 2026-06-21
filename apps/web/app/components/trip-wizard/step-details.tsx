import { Minus, Plus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { BUDGET_OPTIONS } from "~/data/trip.constants";
import type { CreateTripValues } from "~/schemas/trip.schema";

interface StepDetailsProps {
  form: UseFormReturn<CreateTripValues>;
}

export function StepDetails({ form }: StepDetailsProps) {
  const { watch, setValue } = form;
  const days = watch("numberOfDays");
  const budget = watch("budgetType");

  const setDays = (next: number) =>
    setValue("numberOfDays", Math.min(30, Math.max(1, next)));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold text-primary">How many days?</h3>
        <div className="mt-3 flex items-center justify-center gap-6 rounded-xl border border-gray-200 py-4">
          <button
            type="button"
            onClick={() => setDays(days - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-16 text-center text-3xl font-bold text-primary">
            {days}
          </span>
          <button
            type="button"
            onClick={() => setDays(days + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-primary">Budget level</h3>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {BUDGET_OPTIONS.map((option) => {
            const Icon = option.icon;
            const active = budget === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue("budgetType", option.value)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-colors ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/40"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${active ? "text-primary" : "text-muted"}`}
                />
                <span className="text-sm font-semibold text-primary">
                  {option.label}
                </span>
                <span className="text-[11px] leading-tight text-muted">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
