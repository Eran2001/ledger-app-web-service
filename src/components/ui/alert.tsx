import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full lg-rounded border px-4 py-3 grid gap-y-1",
  {
    variants: {
      variant: {
        default: [
          "surface-card text-main",
          "[&_[data-slot=alert-description]]:text-faint",
        ].join(" "),
        info: "surface-brand-soft text-brand border-info-soft",
        warning: "surface-warning-soft text-warning-role border-warning-soft",
        destructive: "surface-danger-soft text-danger border-danger-soft",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({
  className,
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> & { icon?: React.ReactNode }) {
  return (
    <div
      data-slot="alert-title"
      className={cn("flex items-center gap-2 t-meta-bold", className)}
      {...props}
    >
      {icon && <span className="shrink-0 [&>svg]:size-5">{icon}</span>}
      <span className="line-clamp-1">{children}</span>
    </div>
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("t-caption grid justify-items-start gap-1 pl-7", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
