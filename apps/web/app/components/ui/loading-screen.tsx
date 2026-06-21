import { Spinner } from "./spinner";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading…" }: LoadingScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted">
      <Spinner className="h-8 w-8 text-primary" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
