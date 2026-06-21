import { AnimatePresence, motion } from "framer-motion";
import { HERO_SLIDES } from "~/data/hero.constants";

interface HeroBackdropProps {
  active: number;
}

export function HeroBackdrop({ active }: HeroBackdropProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={active}
          src={HERO_SLIDES[active].image}
          alt={HERO_SLIDES[active].location}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 7 } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
    </div>
  );
}
