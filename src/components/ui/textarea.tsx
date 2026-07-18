import * as React from "react";

import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

function Textarea({
  className,
  size,
  ...props
}: React.ComponentProps<"textarea"> & { size?: ResponsiveSize }) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "xl-rounded border",
        "flex field-sizing-content w-full py-2",
        resolvedSize === "compact"
          ? "min-h-textarea-compact px-2.5 t-label-md"
          : resolvedSize === "large"
            ? "min-h-textarea-large px-4 t-body-md"
            : resolvedSize === "extra-large"
              ? "min-h-textarea-extra-large px-5 t-body-lg"
              : "min-h-textarea px-3 t-body-md",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "textarea-field",
        "invalid-state",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
