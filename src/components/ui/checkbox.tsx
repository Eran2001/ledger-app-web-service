import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import * as Icon from "@/components/icons";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";
import { useWidth } from "@/hooks/use-width";

const CHECKBOX_CONTROL_CLASS: Record<ResponsiveSize, string> = {
  compact: "size-4",
  default: "size-4",
  large: "size-[1.125rem]",
  "extra-large": "size-5",
};

const CHECKBOX_ICON_CLASS: Record<ResponsiveSize, string> = {
  compact: "size-3",
  default: "size-3",
  large: "size-3.5",
  "extra-large": "size-3.5",
};

const CHECKBOX_LABEL_OFFSET_CLASS: Record<ResponsiveSize, string> = {
  compact: "h-5 pt-0.5",
  default: "h-5 pt-0.5",
  large: "h-6 pt-1",
  "extra-large": "h-6 pt-1",
};

function Checkbox({
  id,
  label,
  description,
  className,
  containerClassName,
  labelClassName,
  descriptionClassName,
  size,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  size?: ResponsiveSize;
}) {
  const { width, breakpoints } = useWidth();
  const resolvedSize = size ?? getResponsiveSize(width, breakpoints);
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  const checkboxControl = (
    <CheckboxPrimitive.Root
      id={checkboxId}
      data-slot="checkbox"
      className={cn(
        "peer shrink-0",
        CHECKBOX_CONTROL_CLASS[resolvedSize],
        "global-rounded border-stroke border-input-default",
        "cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "checkbox-root",
        "invalid-state",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <Icon.CheckIcon className={CHECKBOX_ICON_CLASS[resolvedSize]} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label && !description) {
    return checkboxControl;
  }

  return (
    <div className={cn("flex items-start gap-3", containerClassName)}>
      <div
        className={cn(
          "flex shrink-0 items-start",
          CHECKBOX_LABEL_OFFSET_CLASS[resolvedSize],
        )}
      >
        {checkboxControl}
      </div>
      <div className={cn("min-w-0", description && "space-y-1")}>
        {label && (
          <Label
            htmlFor={checkboxId}
            className={cn("cursor-pointer", labelClassName)}
          >
            {label}
          </Label>
        )}
        {description && (
          <p className={cn("t-label-md text-soft", descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export { Checkbox };
