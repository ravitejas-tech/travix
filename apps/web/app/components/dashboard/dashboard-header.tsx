import { useNavigate } from "react-router";

import { useAuthStore } from "~/stores/auth.store";
import type { V1AuthControllerMeResponse } from "~/api";

interface DashboardHeaderProps {
  user: V1AuthControllerMeResponse | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const name = user?.firstName ?? user?.email ?? "traveler";

  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4 sm:px-10">
      <span className="text-xl font-bold text-primary">Travix</span>
      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-muted sm:block">
          Hi, {name}
        </span>
        <button
          onClick={handleLogout}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-gray-50"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
