import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";

interface LoadingProps {
  label?: string;
}

export function Loading({ label = "Loading" }: LoadingProps) {
  return (
    <div
      className="relative flex-1 min-h-full w-full surface-background"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2",
          "flex-col items-center gap-3 text-soft",
        )}
      >
        <Spinner />
        <span className="t-body-md">{label}</span>
      </div>
    </div>
  );
}
