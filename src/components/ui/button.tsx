import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import * as Icon from "@/components/icons";
import { cn } from "@/lib/utils";
import { useWidth } from "@/hooks/use-width";
import {
  getResponsiveSize,
  type ResponsiveSize,
} from "@/utils/get-responsive-size";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer",
    "xl-rounded transition-all btn-base",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "surface-brand text-inverse dark:text-[hsl(30_10%_11%)] btn-roll",
        destructive:
          "surface-danger text-on-destructive dark:text-[hsl(30_10%_11%)] btn-destructive",
        success:
          "surface-success text-on-success dark:text-[hsl(30_10%_11%)] btn-success",
        outline:
          "border btn-outline dark:text-[var(--foreground)] dark:hover:text-[var(--foreground)]",
        secondary: "btn-secondary",
        ghost:
          "btn-ghost dark:text-[var(--foreground)] dark:hover:text-[var(--foreground)]",
        cancel:
          "border btn-cancel dark:text-[var(--foreground)] dark:hover:text-[var(--foreground)]",
        link: "text-brand btn-link",
        "sidebar-icon": "app-sidebar-link app-sidebar-icon-btn",
      },
      size: {
        default: "h-field px-4 t-meta has-[>svg]:px-3",
        sm: "h-compact xl-rounded gap-1.5 px-3 t-caption has-[>svg]:px-2.5",
        lg: "h-large xl-rounded px-6 t-meta has-[>svg]:px-4",
        xl: "h-extra-large xl-rounded px-8 t-body has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

const RESPONSIVE_SIZE_MAP: Record<
  ResponsiveSize,
  NonNullable<VariantProps<typeof buttonVariants>["size"]>
> = {
  compact: "sm",
  default: "default",
  large: "lg",
  "extra-large": "xl",
};

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) => {
  const { width, breakpoints } = useWidth();
  const resolvedSize =
    size ?? RESPONSIVE_SIZE_MAP[getResponsiveSize(width, breakpoints)];
  const Comp = asChild ? Slot : "button";
  const isRoll = variant === "default" || variant === undefined;

  const content = asChild ? (
    children
  ) : isRoll ? (
    <span className="btn-roll-clip inline-flex flex-col overflow-hidden">
      <span className="btn-roll-track flex flex-col">
        <span className="btn-roll-face inline-flex items-center justify-center gap-2">
          {children}
        </span>
        <span
          className="btn-roll-face inline-flex items-center justify-center gap-2"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </span>
  ) : (
    children
  );

  return (
    <Comp
      data-slot="button"
      className={cn(
        "relative",
        buttonVariants({ variant, size: resolvedSize, className }),
      )}
      disabled={loading || disabled}
      {...props}
    >
      {asChild ? (
        content
      ) : (
        <>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Icon.Loader2 className="size-4 animate-spin" />
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-2",
              loading && "opacity-0",
            )}
          >
            {content}
          </span>
        </>
      )}
    </Comp>
  );
};

export { Button, buttonVariants };
