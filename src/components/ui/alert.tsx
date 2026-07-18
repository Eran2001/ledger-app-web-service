import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import * as Icon from "@/components/icons";
import { cn } from "@/lib/utils";

type AlertVariant = "default" | "success" | "info" | "warning" | "destructive";

const alertVariants = cva(
  "relative flex w-full items-start gap-3.5 p-5 global-rounded",
  {
    variants: {
      variant: {
        default: "surface-card border-default text-main",
        success: "surface-success-soft border-success-muted text-main",
        info: "surface-info-soft border-info-muted text-main",
        warning: "surface-warning-soft border-warning-soft text-main",
        destructive: "surface-danger-soft border-danger-soft text-main",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const badgeVariants = cva(
  "alert-badge flex h-large w-large shrink-0 items-center justify-center global-rounded",
  {
    variants: {
      variant: {
        default: "surface-muted text-soft",
        success: "surface-success text-on-success",
        info: "surface-info text-on-success",
        warning: "surface-warning text-on-success",
        destructive: "surface-danger text-on-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const titleVariants = cva("t-body-md-bold", {
  variants: {
    variant: {
      default: "text-main",
      success: "text-success-role",
      info: "text-info-role",
      warning: "text-warning-role",
      destructive: "text-danger",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertVariantContext = React.createContext<AlertVariant>("default");

const DEFAULT_ICONS: Record<AlertVariant, typeof Icon.Info> = {
  default: Icon.Info,
  success: Icon.CircleCheckBig,
  info: Icon.Info,
  warning: Icon.TriangleAlert,
  destructive: Icon.CircleX,
};

function Alert({
  className,
  variant,
  border = false,
  shadow = false,
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    border?: boolean;
    shadow?: boolean;
    icon?: React.ReactNode;
  }) {
  const resolvedVariant = variant ?? "default";
  const ResolvedIcon = DEFAULT_ICONS[resolvedVariant];

  return (
    <alertVariantContext.Provider value={resolvedVariant}>
      <div
        data-slot="alert"
        role="alert"
        className={cn(
          alertVariants({ variant: resolvedVariant }),
          border && "border-stroke",
          shadow && "shadow-card",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(badgeVariants({ variant: resolvedVariant }))}
        >
          {icon ?? <ResolvedIcon strokeWidth={3} />}
        </span>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </alertVariantContext.Provider>
  );
}

function AlertTitle({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & { variant?: AlertVariant }) {
  const contextVariant = React.useContext(alertVariantContext);
  const resolvedVariant = variant ?? contextVariant;

  return (
    <div
      data-slot="alert-title"
      className={cn(titleVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("mt-1 t-label-md text-soft", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
