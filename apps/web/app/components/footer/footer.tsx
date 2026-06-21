import { FooterColumn } from "./footer-column";
import { FOOTER_COLUMNS } from "~/data/footer.constants";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <img
            src="/logo.png"
            alt="Travix"
            className="h-14 w-14 object-contain"
          />
          <p className="max-w-xs text-sm text-white/60">
            AI-crafted trips, personal to the way you travel.
          </p>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <FooterColumn key={column.title} column={column} />
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-white/50 sm:flex-row sm:px-10">
          <p>© 2026 Travix. All rights reserved.</p>
          <p>Made for travelers, planned by AI.</p>
        </div>
      </div>
    </footer>
  );
}
