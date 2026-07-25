import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-field w-full items-center",
        "global-rounded border-stroke outline-none",
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
    "t-body-md select-none",
    "[&>svg:not([class*='size-'])]:size-4",
    "[&>kbd]:global-rounded",
    "group-data-[disabled=true]/input-group:opacity-50",
    "input-group-addon",
  ],
  {
    variants: {
      align: {
        "inline-start": [
          "order-first pl-3",
          "has-[>[data-slot=input-group-button]]:ml-[-0.45rem]",
          "has-[>kbd]:ml-[-0.35rem]",
        ],
        "inline-end": [
          "order-last pr-3",
          "has-[>[data-slot=input-group-button]]:mr-[-0.4rem]",
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
        if (
          (e.target as HTMLElement).closest('[data-slot="input-group-button"]')
        ) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-button"
      className={cn(
        "flex h-field items-center justify-center gap-1.5 px-2.5 t-body-md shadow-none global-rounded cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 t-body-md",
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
