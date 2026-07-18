import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1",
    "xl-rounded border px-2 py-0.5 w-fit",
    "t-caption whitespace-nowrap shrink-0 overflow-hidden",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    "aria-invalid:border-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "status-blue",
        secondary: "status-pending",
        destructive: "status-error",
        outline: "status-neutral",
        success: "status-success",
        warning: "status-warning",
        info: "status-info",
        processing: "status-processing",
        overtime: "status-overtime",
        sky: "status-sky",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
