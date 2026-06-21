import { Check } from "lucide-react";
import { Reveal } from "../ui/reveal";
import type { PricingPlan } from "~/types/content.types";

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  const f = plan.featured;

  return (
    <Reveal
      delay={index * 0.1}
      className={`flex flex-col rounded-3xl border p-8 ${
        f
          ? "border-primary bg-primary text-white shadow-2xl shadow-primary/30 lg:-translate-y-4"
          : "border-primary/10 bg-white shadow-sm"
      }`}
    >
      {f && (
        <span className="mb-4 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
          Most popular
        </span>
      )}
      <h3 className={`text-lg font-semibold ${f ? "text-white" : "text-primary"}`}>
        {plan.name}
      </h3>
      <p className={`mt-1 text-sm ${f ? "text-white/70" : "text-muted"}`}>
        {plan.description}
      </p>
      <div className="mt-6 flex items-end gap-1">
        <span className={`text-4xl font-bold ${f ? "text-white" : "text-primary"}`}>
          {plan.price}
        </span>
        <span className={`pb-1 text-sm ${f ? "text-white/70" : "text-muted"}`}>
          /{plan.cadence}
        </span>
      </div>
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-center gap-2 text-sm ${
              f ? "text-white/90" : "text-muted"
            }`}
          >
            <Check className={`h-4 w-4 shrink-0 ${f ? "text-white" : "text-primary"}`} />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`mt-8 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
          f
            ? "bg-white text-primary hover:bg-gray-100"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        {plan.cta}
      </button>
    </Reveal>
  );
}
