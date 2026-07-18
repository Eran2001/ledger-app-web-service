import { Spinner } from "@/components/ui/spinner";

interface LoadingProps {
  label?: string;
}

export function Loading({ label = "Loading" }: LoadingProps) {
  return (
    <div
      className="h-full min-h-full w-full flex items-center justify-center surface-background"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3 text-soft">
        <Spinner className="size-6" />
        <span className="t-body-md">{label}</span>
      </div>
    </div>
  );
}
