import * as React from "react";

import * as Icon from "@/components/icons";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeIconPosition = "left" | "right";
type BadgeIconVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning"
  | "info"
  | "processing"
  | "overtime"
  | "sky";

type BadgeIconProps = Omit<React.ComponentProps<typeof Badge>, "variant"> & {
  variant?: BadgeIconVariant;
  iconPosition?: BadgeIconPosition;
  iconStrokeWidth?: number;
};

const BADGE_ICONS: Record<BadgeIconVariant, typeof Icon.Info> = {
  default: Icon.Info,
  secondary: Icon.Info,
  destructive: Icon.CircleX,
  outline: Icon.Info,
  success: Icon.CircleCheckBig,
  warning: Icon.TriangleAlert,
  info: Icon.Info,
  processing: Icon.LoaderCircle,
  overtime: Icon.TriangleAlert,
  sky: Icon.Info,
};

function BadgeIcon({
  className,
  variant,
  iconPosition = "left",
  iconStrokeWidth = 2.5,
  children,
  ...props
}: BadgeIconProps) {
  const resolvedVariant = (variant ?? "default") as BadgeIconVariant;
  const ResolvedIcon = BADGE_ICONS[resolvedVariant];

  return (
    <Badge
      className={cn("global-rounded", className)}
      variant={resolvedVariant}
      {...props}
    >
      {iconPosition === "left" && (
        <span
          className={cn(
            "badge-icon-slot inline-flex items-center pt-0.5",
            resolvedVariant === "processing" && "animate-spin",
          )}
        >
          <ResolvedIcon strokeWidth={iconStrokeWidth} />
        </span>
      )}
      {children}
      {iconPosition === "right" && (
        <span
          className={cn(
            "badge-icon-slot inline-flex items-center pt-0.5",
            resolvedVariant === "processing" && "animate-spin",
          )}
        >
          <ResolvedIcon strokeWidth={iconStrokeWidth} />
        </span>
      )}
    </Badge>
  );
}

export { BadgeIcon };
