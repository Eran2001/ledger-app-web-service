import * as React from "react";
import { type VariantProps } from "class-variance-authority";

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
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    iconPosition?: BadgeIconPosition;
    iconStrokeWidth?: number;
  }) {
  const resolvedVariant = (variant ?? "default") as BadgeIconVariant;
  const ResolvedIcon = BADGE_ICONS[resolvedVariant];
  const iconClassName = cn(
    "icon-compact",
    resolvedVariant === "processing" && "animate-spin",
  );

  return (
    <Badge
      className={cn("xl-rounded", className)}
      variant={resolvedVariant}
      {...props}
    >
      {iconPosition === "left" && (
        <span className="inline-flex items-center [&>svg]:size-3 pt-0.5">
          <ResolvedIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
        </span>
      )}
      {children}
      {iconPosition === "right" && (
        <span className="inline-flex items-center [&>svg]:size-3 pt-0.5">
          <ResolvedIcon className={iconClassName} strokeWidth={iconStrokeWidth} />
        </span>
      )}
    </Badge>
  );
}

export { BadgeIcon };
