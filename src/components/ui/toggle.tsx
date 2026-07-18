import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 xl-rounded t-meta whitespace-nowrap cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 toggle-base",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-default toggle-outline",
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

export const TOGGLE_RESPONSIVE_SIZE_MAP: Record<
  ResponsiveSize,
  NonNullable<VariantProps<typeof toggleVariants>["size"]>
> = {
  compact: "sm",
  default: "default",
  large: "lg",
  "extra-large": "xl",
};

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  const { width, breakpoints } = useWidth();
  const resolvedSize =
    size ?? TOGGLE_RESPONSIVE_SIZE_MAP[getResponsiveSize(width, breakpoints)];

  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size: resolvedSize, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
