import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { cn } from "@/lib/utils";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  className,
  border = false,
  shadow = false,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
  border?: boolean;
  shadow?: boolean;
}) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(
        "surface-card flex h-field w-full items-center px-3",
        "global-rounded",
        "cursor-pointer t-body-md",
        border && "border-stroke border-default",
        shadow && "shadow-card",
        className,
      )}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  border = false,
  shadow = false,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> & {
  border?: boolean;
  shadow?: boolean;
}) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        "surface-card global-rounded px-3 py-2 t-body-md",
        border && "border-stroke border-default",
        shadow && "shadow-card",
        className,
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
