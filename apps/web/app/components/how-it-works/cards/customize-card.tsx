import { BentoCard } from "../bento-card";

export function CustomizeCard() {
  return (
    <BentoCard className="group relative">
      <img
        src="/images/how-it-works/landscape.png"
        alt="A tropical beach with overwater bungalows"
        className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      <p className="absolute bottom-5 left-5 max-w-[80%] text-lg font-semibold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
        Add, remove or regenerate any day
      </p>
    </BentoCard>
  );
}
