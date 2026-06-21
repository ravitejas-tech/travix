import { SectionHeading } from "../ui/section-heading";
import { DestinationCard } from "./destination-card";
import { DESTINATIONS } from "~/data/destinations.constants";

// First card is the hero of the grid (2x2); the rest fill the remaining cells.
const SPANS = ["col-span-2 row-span-2", "", "", "", ""];

export function Destinations() {
  return (
    <section id="destinations" className="bg-primary/[0.03] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Destinations"
          title="Wherever you're dreaming of, Travix has been there"
          subtitle="From alpine valleys to island sunsets, get a tailored plan for any corner of the map."
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-5 sm:auto-rows-[200px] lg:grid-cols-4">
          {DESTINATIONS.map((destination, index) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
              className={SPANS[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
