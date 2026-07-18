import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 t-label-md-bold text-main select-none",
        "label",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="text-danger">*</span>}
    </LabelPrimitive.Root>
  );
}

export { Label };
