import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import * as Icon from "@/components/icons";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer",
    "global-rounded transition-all btn-base",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "surface-brand text-inverse btn-roll",
        destructive: "surface-danger text-inverse btn-destructive",
        outline: "border shadow-card-hover btn-outline",
        secondary: "btn-secondary",
        ghost: "btn-ghost",
        cancel: "border btn-cancel",
        link: "text-brand btn-link",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 global-rounded gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 global-rounded px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

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
  const Comp = asChild ? Slot : "button";
  const isRoll = variant === "default" || variant === undefined;

  const content = asChild ? (
    children
  ) : isRoll ? (
    <span className="btn-roll-clip inline-flex flex-col overflow-hidden">
      <span className="btn-roll-track flex flex-col">
        <span className="btn-roll-face inline-flex items-center justify-center gap-2">{children}</span>
        <span className="btn-roll-face inline-flex items-center justify-center gap-2" aria-hidden="true">
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
      className={cn("relative", buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Icon.Loader2 className="size-4 animate-spin" />
        </span>
      )}
      <span className={cn("inline-flex items-center gap-2", loading && "opacity-0")}>{content}</span>
    </Comp>
  );
};

export { Button, buttonVariants };
