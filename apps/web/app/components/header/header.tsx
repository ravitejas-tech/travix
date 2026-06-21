import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { useScrolled } from "~/hooks/use-scrolled";

export function Header() {
  const scrolled = useScrolled(80);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md shadow-primary/5" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 sm:px-10 ${
          scrolled ? "py-2.5" : "py-6"
        }`}
      >
        <Logo compact={scrolled} />
        <NavMenu scrolled={scrolled} />
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className={`hidden text-sm font-medium transition-colors sm:block ${
              scrolled
                ? "text-muted hover:text-primary"
                : "text-white/80 hover:text-white"
            }`}
          >
            Sign in
          </Link>
          <Button
            variant={scrolled ? "solid" : "primary"}
            onClick={() => navigate("/register")}
          >
            Get started
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
