import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "../ui/reveal";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

interface BentoGridProps {
  inputs: ReactNode;
  itinerary: ReactNode;
  interests: ReactNode;
  customize: ReactNode;
  stat: ReactNode;
  journey: ReactNode;
}

export function BentoGrid({
  inputs,
  itinerary,
  interests,
  customize,
  stat,
  journey,
}: BentoGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-4 md:h-full md:grid-cols-3 md:grid-rows-3"
    >
      <motion.div variants={item} className="md:row-span-1">{inputs}</motion.div>
      <motion.div variants={item} className="md:row-span-3">{itinerary}</motion.div>
      <motion.div variants={item} className="md:row-span-1">{interests}</motion.div>
      <motion.div variants={item} className="md:row-span-1">{customize}</motion.div>
      <motion.div variants={item} className="md:row-span-2">{stat}</motion.div>
      <motion.div variants={item} className="md:row-span-1">{journey}</motion.div>
    </motion.div>
  );
}
