import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { getAvatarColors } from "@/utils/get-avatar-colors";

function Avatar({
  className,
  border = false,
  shadow = false,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  border?: boolean;
  shadow?: boolean;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex h-field w-field shrink-0 overflow-hidden global-rounded",
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
