import * as React from "react";

import { cn } from "@/lib/utils";

const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "input-field global-rounded border-stroke h-field w-full min-w-0 px-3 t-body-md",
        "file:inline-flex file:h-small file:no-border file:surface-transparent file:t-input",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "invalid-state",
        className,
      )}
      {...props}
    />
  );
};

export { Input };
