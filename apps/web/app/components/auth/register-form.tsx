import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useRegister } from "~/queries/auth.query";
import { registerSchema, type RegisterFormValues } from "~/schemas/auth.schema";
import { AuthField } from "./auth-field";
import { AuthSubmit } from "./auth-submit";

export function RegisterForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (values: RegisterFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Account created. Welcome to Travix!");
        navigate("/dashboard");
      },
      onError: () => toast.error("Could not create account. Try again."),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <AuthField
          id="firstName"
          label="First name"
          placeholder="John"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <AuthField
          id="lastName"
          label="Last name"
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>
      <AuthField
        id="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <AuthField
        id="password"
        type="password"
        label="Password"
        placeholder="At least 8 characters"
        error={errors.password?.message}
        {...register("password")}
      />
      <AuthSubmit label="Create account" loading={isPending} />
    </form>
  );
}
