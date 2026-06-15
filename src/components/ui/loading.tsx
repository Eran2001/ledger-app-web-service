import { Spinner } from "@/components/ui/spinner";

interface LoadingProps {
  label?: string;
}

export function Loading({ label = "Loading" }: LoadingProps) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center surface-page"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3 text-soft">
        <Spinner className="size-6" />
        <span className="t-meta">{label}</span>
      </div>
    </div>
  );
}
