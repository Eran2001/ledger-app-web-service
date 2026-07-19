import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 global-rounded t-body-md whitespace-nowrap cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 toggle-base",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-stroke border-default toggle-outline",
      },
      size: {
        default: "h-field px-2 min-w-9",
        sm: "h-compact px-1.5 min-w-8",
        lg: "h-large px-2.5 min-w-10",
        xl: "h-extra-large px-3 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  Omit<VariantProps<typeof toggleVariants>, "size">) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size: "default", className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
