import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "badge-text inline-flex items-center cursor-auto global-rounded border px-2.5 py-0.5 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent surface-brand text-brand-contrast",
        secondary: "border-transparent surface-secondary text-secondary-contrast",
        destructive:
          "border-transparent surface-danger text-danger-contrast",
        outline: "text-main",
        interactive:
          "cursor-pointer text-main border-border hover:surface-muted",
        approved: "status-success",
        pending: "status-warning",
        processing: "status-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
