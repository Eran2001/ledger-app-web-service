import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

const SWITCH_TRACK_CLASS: Record<ResponsiveSize, string> = {
  compact: "switch-sm",
  default: "switch-default",
  large: "switch-lg",
  "extra-large": "switch-xl",
};

function Switch({
  id,
  label,
  className,
  containerClassName,
  labelClassName,
  size,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  size?: ResponsiveSize;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);
  const generatedId = React.useId();
  const switchId = id ?? generatedId;

  const switchControl = (
    <SwitchPrimitive.Root
      id={switchId}
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center border xl-rounded cursor-pointer switch-track",
        SWITCH_TRACK_CLASS[resolvedSize],
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block xl-rounded transition-transform switch-thumb",
          "data-[state=checked]:translate-x-[calc(100%-2px)]",
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
        className={cn("t-meta text-main cursor-pointer", labelClassName)}
      >
        {label}
      </Label>
    </div>
  );
}

export { Switch };
