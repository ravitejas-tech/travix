import { forwardRef, type InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-white/90">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`rounded-xl border bg-white/10 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/50 focus:border-white/60 focus:bg-white/15 ${
            error ? "border-red-300" : "border-white/20"
          }`}
          {...props}
        />
        {error && <span className="text-xs text-red-200">{error}</span>}
      </div>
    );
  }
);

AuthField.displayName = "AuthField";
