import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const aspectRatioVariants = cva("global-rounded overflow-hidden", {
  variants: {
    variant: {
      default: "surface-muted border-default",
      success: "surface-success-soft border-success-muted",
      info: "surface-info-soft border-info-muted",
      warning: "surface-warning-soft border-warning-soft",
      destructive: "surface-danger-soft border-danger-soft",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function AspectRatio({
  className,
  variant,
  border = false,
  shadow = false,
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root> &
  VariantProps<typeof aspectRatioVariants> & {
    border?: boolean;
    shadow?: boolean;
  }) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      className={cn(
        aspectRatioVariants({ variant }),
        border && "border-stroke",
        shadow && "shadow-card",
        className,
      )}
      {...props}
    />
  );
}

export { AspectRatio };
