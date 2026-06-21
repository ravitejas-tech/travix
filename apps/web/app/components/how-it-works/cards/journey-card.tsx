import { BentoCard } from "../bento-card";
import { SAMPLE_DAYS } from "~/data/how-it-works.constants";

export function JourneyCard() {
  return (
    <BentoCard className="flex flex-col justify-center gap-3 bg-white p-5">
      <div>
        <h3 className="text-base font-semibold text-primary">Your journey, mapped</h3>
        <p className="text-sm text-muted">Every day planned end to end.</p>
      </div>
      <div className="flex flex-col gap-2">
        {SAMPLE_DAYS.map((day) => (
          <div key={day.day} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {day.day.replace("Day ", "")}
            </span>
            <span className="truncate text-sm text-muted">{day.activity}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
