import type { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export function BentoCard({ children, className = "" }: BentoCardProps) {
  return (
    <div
      className={`h-full overflow-hidden rounded-3xl border border-primary/10 transition-shadow hover:shadow-xl hover:shadow-primary/10 ${className}`}
    >
      {children}
    </div>
  );
}
