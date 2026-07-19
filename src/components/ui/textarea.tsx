import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "global-rounded border-stroke border-input-default",
        "flex field-sizing-content w-full min-h-textarea px-3 py-2 t-body-md",
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
