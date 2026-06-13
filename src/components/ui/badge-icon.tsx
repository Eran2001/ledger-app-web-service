import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { Badge, badgeVariants } from "@/components/ui/badge";

type BadgeIconPosition = "left" | "right";

function BadgeIcon({
  icon,
  iconPosition = "left",
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    icon: React.ReactNode;
    iconPosition?: BadgeIconPosition;
  }) {
  return (
    <Badge {...props}>
      {iconPosition === "left" && (
        <span className="inline-flex items-center [&>svg]:size-3 pt-0.5">
          {icon}
        </span>
      )}
      {children}
      {iconPosition === "right" && (
        <span className="inline-flex items-center [&>svg]:size-3 pt-0.5">
          {icon}
        </span>
      )}
    </Badge>
  );
}

export { BadgeIcon };
