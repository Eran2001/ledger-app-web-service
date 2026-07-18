import * as React from "react";

import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  size?: ResponsiveSize;
}

const Input = ({ className, type, size, ...props }: InputProps) => {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "xl-rounded border w-full min-w-0",
        resolvedSize === "compact"
          ? "h-compact px-2.5 t-caption"
          : resolvedSize === "large"
            ? "h-large px-4 t-meta"
            : resolvedSize === "extra-large"
              ? "h-extra-large px-5 t-body"
              : "h-field px-3 t-meta",
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
