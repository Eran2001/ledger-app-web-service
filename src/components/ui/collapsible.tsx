import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  className,
  size,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
  size?: ResponsiveSize;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(
        "flex w-full items-center",
        "xl-rounded border",
        "cursor-pointer",
        resolvedSize === "compact"
          ? "h-compact px-2.5 t-label-md"
          : resolvedSize === "large"
            ? "h-large px-4 t-body-md"
            : resolvedSize === "extra-large"
              ? "h-extra-large px-5 t-body-lg"
              : "h-field px-3 t-body-md",
        className,
      )}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn("px-3 py-2 t-body-md", className)}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
