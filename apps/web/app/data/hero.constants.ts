import type { HeroSlide } from "~/types/hero.types";

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/images/hero/carousel-1.png",
    headline: "AI that researches a thousand trips, so you plan just one.",
    location: "Marina Bay · Singapore",
    title: "Plan Singapore in seconds",
    subtitle: "Skyline views, hawker food and quiet gardens, all in one go.",
  },
  {
    image: "/images/hero/carousel-2.png",
    headline: "Let intelligence map the route — you keep the wonder.",
    location: "Hidden Coast · Worldwide",
    title: "Find places you'd never search for",
    subtitle: "AI surfaces the spots that match exactly what you love.",
  },
  {
    image: "/images/hero/carousel-3.png",
    headline: "Skip the endless tabs, spreadsheets and second-guessing.",
    location: "Chamonix · French Alps",
    title: "Adventure trips, sorted",
    subtitle: "Trails, timings and budgets tuned to how you travel.",
  },
  {
    image: "/images/hero/carousel-4.png",
    headline: "One idea in. A whole trip out.",
    location: "Anywhere · You decide",
    title: "Your next journey starts here",
    subtitle: "Name the place — we'll take it from there.",
  },
];

export const HERO_AUTOPLAY_MS = 6000;
