import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  border?: boolean;
  shadow?: boolean;
};

type CardHeaderProps = React.ComponentProps<"div"> & {
  border?: boolean;
};

type CardEmptyProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Card({
  className,
  border = false,
  shadow = true,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6",
        "global-rounded p-6",
        border && "border-stroke border-default",
        shadow ? "shadow-card" : "no-shadow",
        "card-root",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, border = false, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header",
        "grid auto-rows-min grid-rows-[auto_auto]",
        "items-start gap-2",
        "px-6 py-4",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        border && "border-b-stroke border-default",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  icon: Icon,
  children,
  ...props
}: React.ComponentProps<"div"> & { icon?: React.ElementType }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "t-title-lg-soft",
        Icon && "flex items-center gap-2",
        className,
      )}
      {...props}
    >
      {Icon && (
        <span className="inline-flex items-center justify-center text-brand [&>svg]:size-4 [&>svg]:shrink-0">
          <Icon />
        </span>
      )}
      {children}
    </div>
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("t-body-md card-description", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1",
        "self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

function CardEmpty({
  className,
  icon: Icon,
  title,
  description,
  ...props
}: CardEmptyProps) {
  return (
    <CardContent
      data-slot="card-empty"
      className={cn(
        "flex flex-col items-center justify-center px-6 py-8 text-center",
        className,
      )}
      {...props}
    >
      <div className="surface-page flex h-large w-large items-center justify-center full-rounded">
        <span className="inline-flex items-center justify-center text-faint [&>svg]:size-6 [&>svg]:shrink-0">
          <Icon />
        </span>
      </div>

      <div className="space-y-2">
        <p className="t-body-md-bold text-main">{title}</p>
        <p className="t-label-md text-faint">{description}</p>
      </div>
    </CardContent>
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <>
      <Separator />
      <div
        data-slot="card-footer"
        className={cn("flex items-center", className)}
        {...props}
      />
    </>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardEmpty,
};
