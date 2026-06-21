import { Button } from "../ui/button";
import { Reveal } from "../ui/reveal";
import { StatGrid } from "./stat-grid";

export function About() {
  return (
    <section id="about" className="bg-primary/[0.03] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-2">
        <Reveal className="relative">
          <img
            src="/images/about/portrait.png"
            alt="A traveler planning a trip on Travix"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-primary/20"
          />
          <div className="absolute -bottom-5 -right-2 rounded-2xl bg-white px-5 py-4 shadow-xl sm:-right-5">
            <p className="text-2xl font-bold text-primary">24/7</p>
            <p className="text-xs text-muted">your AI travel agent</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why Travix
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-primary sm:text-4xl">
            The planning, handled. The journey, yours.
          </h2>
          <p className="text-muted">
            Travix learns your budget, your dates and the things you enjoy, then
            turns them into a trip you can reshape whenever the mood strikes. Every
            plan stays private to you — yours to tweak, regenerate or follow exactly
            as it is.
          </p>
          <StatGrid />
          <div>
            <Button variant="solid">Start planning free</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
