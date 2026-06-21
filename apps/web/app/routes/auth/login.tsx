import { Link } from "react-router";

import type { Route } from "./+types/login";
import { AuthLayout } from "../../components/auth/auth-layout";
import { LoginForm } from "../../components/auth/login-form";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Sign in · Travix" }];
}

export default function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue planning your next trip."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-white underline-offset-4 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
