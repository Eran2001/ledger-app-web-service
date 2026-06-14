import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  size?: "default" | "compact" | "large";
}

const Input = ({ className, type, size = "default", ...props }: InputProps) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "t-meta global-rounded border w-full min-w-0 px-3 py-2",
        size === "compact" ? "h-compact" : size === "large" ? "h-large" : "h-field",
        "file:inline-flex file:h-small file:no-border file:surface-transparent file:t-input",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "input-field",
        "invalid-state",
        className,
      )}
      {...props}
    />
  );
};

export { Input };
