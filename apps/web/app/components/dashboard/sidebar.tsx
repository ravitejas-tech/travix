import { motion } from "framer-motion";
import { Link } from "react-router";

import { NAV_ITEMS } from "~/data/dashboard.constants";
import { SidebarLink } from "./sidebar-link";
import { SidebarProfile } from "./sidebar-profile";

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex h-full w-[272px] shrink-0 flex-col border-r border-slate-100 bg-white/80 backdrop-blur-md px-4 py-6"
    >
      <Link to="/dashboard" className="mb-8 flex items-center gap-2.5 px-3 group">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary/5 transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/10">
          <img src="/logo.png" alt="Travix" className="h-6 w-6 object-contain" />
          <div className="absolute inset-0 rounded-xl border border-primary/15" />
        </div>
        <span className="text-xl font-bold tracking-tight text-primary transition-colors group-hover:text-primary-dark">
          Travix
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <SidebarLink key={item.path} item={item} />
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <SidebarProfile />
      </div>
    </motion.aside>
  );
}

