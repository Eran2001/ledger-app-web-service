import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "t-meta global-rounded border",
        "flex field-sizing-content min-h-textarea w-full px-3 py-2",
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
