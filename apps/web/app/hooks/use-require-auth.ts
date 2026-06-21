import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "~/stores/auth.store";

/**
 * Client-side guard. Redirects to `/login` when the user is not authenticated.
 * Returns the rehydrated auth state so callers can gate rendering.
 */
export function useRequireAuth() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login", { replace: true });
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
}
