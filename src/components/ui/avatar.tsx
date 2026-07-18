import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";

import { useWidth } from "@/hooks/use-width";
import { cn } from "@/lib/utils";
import { getResponsiveSize } from "@/utils/get-responsive-size";

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

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = getResponsiveSize(width, breakpoints);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size: resolvedSize }), className)}
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
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "app-sidebar-logo sidebar-brand-logo flex",
        "size-full items-center justify-center xl-rounded",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
