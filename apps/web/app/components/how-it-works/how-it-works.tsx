import { SectionHeading } from "../ui/section-heading";
import { BentoGrid } from "./bento-grid";
import { CustomizeCard } from "./cards/customize-card";
import { InputsCard } from "./cards/inputs-card";
import { InterestsCard } from "./cards/interests-card";
import { ItineraryCard } from "./cards/itinerary-card";
import { JourneyCard } from "./cards/journey-card";
import { StatCard } from "./cards/stat-card";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto flex max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 md:h-screen md:py-14"
    >
      <SectionHeading
        eyebrow="How it works"
        title="Four steps to your perfect trip"
        subtitle="Share a few details and how you like to travel. Travix shapes everything else."
      />

      <div className="mt-8 md:min-h-0 md:flex-1">
        <BentoGrid
          inputs={<InputsCard />}
          itinerary={<ItineraryCard />}
          interests={<InterestsCard />}
          customize={<CustomizeCard />}
          stat={<StatCard />}
          journey={<JourneyCard />}
        />
      </div>
    </section>
  );
}
