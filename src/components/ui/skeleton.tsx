import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse global-rounded bg-muted", className)} {...props} />;
}

export { Skeleton };
