import { Minus, Plus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { BUDGET_OPTIONS } from "~/data/trip.constants";
import type { CreateTripValues } from "~/schemas/trip.schema";

interface PlannerStepDetailsProps {
  form: UseFormReturn<CreateTripValues>;
}

export function PlannerStepDetails({ form }: PlannerStepDetailsProps) {
  const { watch, setValue } = form;
  const days = watch("numberOfDays");
  const budget = watch("budgetType");

  const setDays = (next: number) =>
    setValue("numberOfDays", Math.min(30, Math.max(1, next)));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-bold text-primary tracking-tight">How many days?</h3>
        <div className="mt-2 flex items-center justify-center gap-6 rounded-xl border border-slate-100 bg-slate-50/50 py-3">
          <button
            type="button"
            onClick={() => setDays(days - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-100 text-primary transition-all hover:bg-primary hover:text-white hover:scale-105 active:scale-95"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-16 text-center text-3xl font-extrabold text-primary tracking-tight">
            {days}
          </span>
          <button
            type="button"
            onClick={() => setDays(days + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-100 text-primary transition-all hover:bg-primary hover:text-white hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-primary tracking-tight">Budget Level</h3>
        <div className="mt-2 grid grid-cols-3 gap-2.5">
          {BUDGET_OPTIONS.map((option) => {
            const Icon = option.icon;
            const active = budget === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue("budgetType", option.value)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all ${
                  active
                    ? "border-primary bg-primary/5 shadow-sm shadow-primary/5"
                    : "border-slate-100 bg-white hover:border-primary/30"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-transform ${active ? "text-primary scale-110" : "text-muted/70"}`}
                />
                <span className="text-xs font-bold text-primary">
                  {option.label}
                </span>
                <span className="text-[10px] leading-tight text-muted/80">
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
