import { BentoCard } from "../bento-card";
import { TRIP_INPUTS } from "~/data/how-it-works.constants";

export function InputsCard() {
  return (
    <BentoCard className="flex flex-col justify-center gap-3 bg-white p-5">
      <div>
        <h3 className="text-base font-semibold text-primary">Tell us your trip</h3>
        <p className="text-sm text-muted">A quick form — that's it.</p>
      </div>
      <div className="flex flex-col gap-2">
        {TRIP_INPUTS.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.label}
              className="flex items-center gap-3 rounded-xl bg-primary/5 px-3 py-1.5"
            >
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted">{field.label}</span>
              <span className="ml-auto text-sm font-medium text-primary">
                {field.value}
              </span>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
}
