import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  variant?: "full" | "default" | "inline";
  className?: string;
  size?: "sm" | "md" | "lg";
}

function Spinner({ variant = "default", className = "", size }: SpinnerProps) {
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-12 w-12" : "h-6 w-6";

  if (className || size) {
    return <Loader2 className={cn("animate-spin text-primary", sizeClass, className)} />;
  }

  if (variant === "inline") {
    return <Loader2 className="animate-spin h-4 w-4 text-primary" />;
  }

  const wrapperClass =
    variant === "full"
      ? "flex min-h-screen items-center justify-center"
      : "flex items-center justify-center min-h-125";

  return (
    <div className={wrapperClass}>
      <Loader2 className="animate-spin h-9 w-9 text-primary" />
    </div>
  );
}

export { Spinner };