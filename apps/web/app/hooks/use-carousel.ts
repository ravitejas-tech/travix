import { useCallback, useEffect, useState } from "react";

interface UseCarousel {
  active: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

export function useCarousel(length: number, intervalMs: number): UseCarousel {
  const [active, setActive] = useState(0);

  const goTo = useCallback(
    (index: number) => setActive(((index % length) + length) % length),
    [length],
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs, active]);

  return { active, goTo, next, prev };
}
