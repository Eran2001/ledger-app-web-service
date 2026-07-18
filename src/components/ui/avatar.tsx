import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";

import { useWidth } from "@/hooks/use-width";
import { cn } from "@/lib/utils";
import { getAvatarColors } from "@/utils/get-avatar-colors";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden xl-rounded",
  {
    variants: {
      size: {
        compact: "h-field w-field",
        default: "h-large w-large",
        large: "h-medium-large w-medium-large",
        "extra-large": "h-extra-large w-extra-large",
        auto: "h-full w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type AvatarSize = ResponsiveSize | "auto";

function Avatar({
  className,
  size,
  border = false,
  shadow = false,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
  border?: boolean;
  shadow?: boolean;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        avatarVariants({ size: resolvedSize }),
        border && "border-stroke border-default",
        shadow && "shadow-card",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  style,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const textContent =
    typeof children === "string"
      ? children
      : typeof children === "number"
        ? String(children)
        : "";
  const colors = textContent ? getAvatarColors(textContent) : null;

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "app-sidebar-logo sidebar-brand-logo flex",
        "t-label-md-bold size-full items-center justify-center global-rounded",
        className,
      )}
      style={
        colors
          ? {
              backgroundColor: colors.bg,
              color: colors.fg,
              ...style,
            }
          : style
      }
      children={children}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
