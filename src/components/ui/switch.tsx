import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function Switch({
  id,
  label,
  className,
  containerClassName,
  labelClassName,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}) {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;

  const switchControl = (
    <SwitchPrimitive.Root
      id={switchId}
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center border-stroke full-rounded cursor-pointer switch-track switch-xl",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block full-rounded transition-transform switch-thumb",
          "data-[state=checked]:translate-x-[calc(100%-0.125rem)]",
          "data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (!label) {
    return switchControl;
  }

  return (
    <div className={cn("flex items-center gap-3", containerClassName)}>
      {switchControl}
      <Label
        htmlFor={switchId}
        className={cn("t-body-md text-main cursor-pointer", labelClassName)}
      >
        {label}
      </Label>
    </div>
  );
}

export { Switch };
