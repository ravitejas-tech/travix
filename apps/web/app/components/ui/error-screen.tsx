import { TriangleAlert } from "lucide-react";

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorScreen({
  message = "Something went wrong.",
  onRetry,
}: ErrorScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <TriangleAlert className="h-10 w-10 text-amber-500" />
      <p className="max-w-sm text-sm text-muted">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Try again
        </button>
      )}
    </div>
  );
}
