import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex flex-col border xl-rounded",
        className,
      )}
      {...props}
    />
  );
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  );
}

const itemVariants = cva(
  [
    "group/item flex items-center flex-wrap",
    "border t-meta xl-rounded outline-none",
    "item-root",
  ],
  {
    variants: {
      variant: {
        default: "",
        outline: "item-outline",
        muted: "item-muted",
      },
      size: {
        compact: "py-2 px-3 gap-2",
        default: "py-3 px-4 gap-2.5",
        large: "p-4 gap-4",
        "extra-large": "p-5 gap-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Item({
  className,
  variant = "default",
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const { width, breakpoints } = useWidth();
  const resolvedSize: ResponsiveSize =
    size ?? getResponsiveSize(width, breakpoints);
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={resolvedSize}
      className={cn(itemVariants({ variant, size: resolvedSize, className }))}
      {...props}
    />
  );
}

const itemMediaVariants = cva(
  [
    "flex shrink-0 items-center justify-center gap-2",
    "group-has-[[data-slot=item-description]]/item:self-start",
    "group-has-[[data-slot=item-description]]/item:translate-y-0.5",
    "[&_svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: "",
        icon: [
          "size-8 border xl-rounded",
          "[&_svg:not([class*='size-'])]:size-4",
          "item-media-icon",
        ],
        image: [
          "size-10 xl-rounded overflow-hidden",
          "[&_img]:size-full [&_img]:object-cover",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1",
        "[&+[data-slot=item-content]]:flex-none",
        className,
      )}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 t-meta item-title",
        className,
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "t-meta fw-normal line-clamp-2 text-balance",
        "[&>a]:underline [&>a]:underline-offset-4",
        "item-description",
        className,
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
