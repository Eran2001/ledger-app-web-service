import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "skeleton-base global-rounded relative overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
