import type { Route } from "./+types/home";
import { Header } from "../components/header/header";
import { Hero } from "../components/hero/hero";
import { HowItWorks } from "../components/how-it-works/how-it-works";
import { Destinations } from "../components/destinations/destinations";
import { Pricing } from "../components/pricing/pricing";
import { About } from "../components/about/about";
import { Footer } from "../components/footer/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Travix — Your AI travel agent" },
    {
      name: "description",
      content:
        "Tell Travix where you want to go and get a complete, personalized itinerary in seconds.",
    },
  ];
}

export default function Home() {
  return (
    <main className="bg-background text-primary">
      <Header />
      <Hero />
      <HowItWorks />
      <Destinations />
      <Pricing />
      <About />
      <Footer />
    </main>
  );
}
