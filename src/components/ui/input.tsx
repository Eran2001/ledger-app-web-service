import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full global-rounded border border-input surface-base px-3 py-2 field-text ring-offset-background file:border-0 file:surface-transparent file:ui-sm file:fw-medium file:text-main placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-brand-field transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:ui-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
