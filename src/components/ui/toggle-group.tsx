import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import { getResponsiveSize } from "@/utils/get-responsive-size";
import {
  toggleVariants,
  TOGGLE_RESPONSIVE_SIZE_MAP,
} from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  const { width, breakpoints } = useWidth();
  const resolvedSize =
    size ?? TOGGLE_RESPONSIVE_SIZE_MAP[getResponsiveSize(width, breakpoints)];

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={resolvedSize}
      className={cn(
        "flex w-fit items-center xl-rounded toggle-group-root",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size: resolvedSize }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);
  const { width, breakpoints } = useWidth();
  const resolvedSize =
    context.size ??
    size ??
    TOGGLE_RESPONSIVE_SIZE_MAP[getResponsiveSize(width, breakpoints)];

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item no-rounded"
      data-variant={context.variant || variant}
      data-size={resolvedSize}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: resolvedSize,
        }),
        "shrink-0 toggle-group-item no-rounded",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
