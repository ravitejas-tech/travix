interface CarouselDotsProps {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}

export function CarouselDots({ count, active, onSelect }: CarouselDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            index === active ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
          }`}
        />
      ))}
    </div>
  );
}
