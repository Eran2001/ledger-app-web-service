import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

interface InputGroupProps extends React.ComponentProps<"div"> {
  size?: ResponsiveSize;
}

function InputGroup({ className, size, ...props }: InputGroupProps) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex w-full items-center",
        "xl-rounded border outline-none",
        resolvedSize === "compact"
          ? "h-compact"
          : resolvedSize === "large"
            ? "h-large"
            : resolvedSize === "extra-large"
              ? "h-extra-large"
              : "h-field",
        "has-[>textarea]:h-auto",
        "input-group-root",

        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto",
        "has-[>[data-align=block-start]]:flex-col",
        "has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto",
        "has-[>[data-align=block-end]]:flex-col",
        "has-[>[data-align=block-end]]:[&>input]:pt-3",

        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  [
    "flex h-auto cursor-text items-center justify-center gap-2 py-1.5",
    "t-meta fw-medium select-none",
    "[&>svg:not([class*='size-'])]:size-4",
    "[&>kbd]:rounded-[calc(var(--radius)-5px)]",
    "group-data-[disabled=true]/input-group:opacity-50",
    "input-group-addon",
  ],
  {
    variants: {
      align: {
        "inline-start": [
          "order-first pl-3",
          "has-[>button]:ml-[-0.45rem]",
          "has-[>kbd]:ml-[-0.35rem]",
        ],
        "inline-end": [
          "order-last pr-3",
          "has-[>button]:mr-[-0.4rem]",
          "has-[>kbd]:mr-[-0.35rem]",
        ],
        "block-start": [
          "order-first w-full justify-start px-3 pt-3",
          "[.border-b]:pb-3",
          "group-has-[>input]/input-group:pt-2.5",
        ],
        "block-end": [
          "order-last w-full justify-start px-3 pb-3",
          "[.border-t]:pt-3",
          "group-has-[>input]/input-group:pb-2.5",
        ],
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  ["t-meta shadow-none flex gap-2 items-center"],
  {
    variants: {
      size: {
        xs: [
          "h-6 gap-1 px-2",
          "xl-rounded",
          "[&>svg:not([class*='size-'])]:size-3.5",
          "has-[>svg]:px-2",
        ],
        sm: ["h-8 px-2.5 gap-1.5", "xl-rounded", "has-[>svg]:px-2.5"],
        "size-3.5": ["size-6 p-0", "xl-rounded", "has-[>svg]:p-0"],
        "icon-sm": ["size-8 p-0", "xl-rounded", "has-[>svg]:p-0"],
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
);

const INPUT_GROUP_BUTTON_SIZE_MAP: Record<
  NonNullable<VariantProps<typeof inputGroupButtonVariants>["size"]>,
  NonNullable<React.ComponentProps<typeof Button>["size"]>
> = {
  xs: "sm",
  sm: "sm",
  "size-3.5": "icon-sm",
  "icon-sm": "icon-sm",
};

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      size={INPUT_GROUP_BUTTON_SIZE_MAP[size ?? "xs"]}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 t-meta",
        "[&_svg]:pointer-events-none",
        "[&_svg:not([class*='size-'])]:size-4",
        "input-group-text",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control no-rounded"
      className={cn(
        "flex-1 border-0 shadow-none",
        "input-group-control no-rounded",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control no-rounded"
      className={cn(
        "flex-1 resize-none border-0 shadow-none py-3",
        "input-group-control no-rounded",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
