import { motion } from "framer-motion";

const STEPS = ["Destination", "Trip details", "Interests"];

interface WizardProgressProps {
  current: number;
}

export function WizardProgress({ current }: WizardProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((label, i) => (
        <div key={label} className="flex flex-1 flex-col gap-1.5">
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{ width: i <= current ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span
            className={`text-xs font-medium ${
              i <= current ? "text-primary" : "text-muted"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
