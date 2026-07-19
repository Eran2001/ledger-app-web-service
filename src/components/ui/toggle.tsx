import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex h-field min-w-9 items-center justify-center gap-2 px-2 global-rounded t-body-md whitespace-nowrap cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 toggle-base",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-stroke border-default toggle-outline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
