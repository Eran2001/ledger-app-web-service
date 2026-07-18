import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import { type ResponsiveSize } from "@/utils/get-responsive-size";

type BreakpointSwitchSize =
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl"
  | "10xl";

type SwitchSize = ResponsiveSize | BreakpointSwitchSize;

const BREAKPOINT_SWITCH_TRACK_CLASS: Record<BreakpointSwitchSize, string> = {
  xxs: "switch-xxs",
  xs: "switch-xs",
  sm: "switch-sm",
  md: "switch-md",
  lg: "switch-lg",
  xl: "switch-xl",
  "2xl": "switch-2xl",
  "3xl": "switch-3xl",
  "4xl": "switch-4xl",
  "5xl": "switch-5xl",
  "6xl": "switch-6xl",
  "7xl": "switch-7xl",
  "8xl": "switch-8xl",
  "9xl": "switch-9xl",
  "10xl": "switch-10xl",
};

const LEGACY_SWITCH_TRACK_CLASS: Record<ResponsiveSize, string> = {
  compact: "switch-xs",
  default: "switch-xl",
  large: "switch-3xl",
  "extra-large": "switch-5xl",
};

function isBreakpointSwitchSize(size: SwitchSize): size is BreakpointSwitchSize {
  return size in BREAKPOINT_SWITCH_TRACK_CLASS;
}

function getResponsiveSwitchSize(
  width: number,
  breakpoints: ReturnType<typeof useWidth>["breakpoints"],
): BreakpointSwitchSize {
  if (width >= breakpoints["10xl"]) return "10xl";
  if (width >= breakpoints["9xl"]) return "9xl";
  if (width >= breakpoints["8xl"]) return "8xl";
  if (width >= breakpoints["7xl"]) return "7xl";
  if (width >= breakpoints["6xl"]) return "6xl";
  if (width >= breakpoints["5xl"]) return "5xl";
  if (width >= breakpoints["4xl"]) return "4xl";
  if (width >= breakpoints["3xl"]) return "3xl";
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  if (width >= breakpoints.xs) return "xs";
  return "xxs";
}

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
  size?: SwitchSize;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedTrackClass = size
    ? isBreakpointSwitchSize(size)
      ? BREAKPOINT_SWITCH_TRACK_CLASS[size]
      : LEGACY_SWITCH_TRACK_CLASS[size]
    : BREAKPOINT_SWITCH_TRACK_CLASS[getResponsiveSwitchSize(width, breakpoints)];
  const generatedId = React.useId();
  const switchId = id ?? generatedId;

  const switchControl = (
    <SwitchPrimitive.Root
      id={switchId}
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center border xl-rounded cursor-pointer switch-track",
        resolvedTrackClass,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block xl-rounded transition-transform switch-thumb",
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
