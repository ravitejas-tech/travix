import { Sparkles } from "lucide-react";
import { BentoCard } from "../bento-card";

export function ItineraryCard() {
  return (
    <BentoCard className="group relative">
      <img
        src="/images/how-it-works/tall-img.png"
        alt="A hiker overlooking an alpine valley"
        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-full"
      />
      <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur">
        <Sparkles className="h-3.5 w-3.5" /> AI builds the plan
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-dark/80 to-transparent p-6">
        <p className="text-lg font-semibold text-white">
          A full plan, built around your taste
        </p>
      </div>
    </BentoCard>
  );
}
