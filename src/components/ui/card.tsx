import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  border?: boolean;
};

type CardHeaderProps = React.ComponentProps<"div"> & {
  border?: boolean;
};

type CardEmptyProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Card({ className, border = false, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6",
        "xl-rounded p-6",
        border && "border",
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
        border && "border-b",
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
      {Icon && <Icon className="icon-compact text-brand" />}
      {children}
    </div>
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("t-body-md fw-normal card-description", className)}
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
      <div className="surface-page flex size-10 items-center justify-center full-rounded">
        <Icon className="size-6 text-faint" />
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
