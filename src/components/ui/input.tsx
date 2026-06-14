import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "t-body text-main surface-transparent border-input-default global-rounded border",
        "h-field w-full min-w-0 px-3 py-1 no-shadow transition-[color,box-shadow] no-outline",
        "file:inline-flex file:h-small file:no-border file:surface-transparent file:t-input",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-ring",
        "invalid-state",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
