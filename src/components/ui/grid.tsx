import * as React from "react";

import * as Icon from "@/components/icons";
import { BadgeIcon } from "@/components/ui/badge-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { cn } from "@/lib/utils";

function Grid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="grid"
      className={cn("grid gap-4 md:grid-cols-2", className)}
      {...props}
    />
  );
}

function GridItem({
  className,
  border = false,
  shadow = false,
  ...props
}: React.ComponentProps<"div"> & {
  border?: boolean;
  shadow?: boolean;
}) {
  return (
    <Card
      border={border}
      shadow={shadow}
      data-slot="grid-item"
      className={cn("gap-5 px-4 py-4 sm:px-5 global-rounded", className)}
      {...props}
    />
  );
}

function GridItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="grid-item-header"
      className={cn("flex items-start justify-between gap-3", className)}
      {...props}
    />
  );
}

function GridItemBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="grid-item-body"
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-3",
        "[&>*:nth-child(even)]:justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

interface GridItemMediaProps {
  name: string;
  title: string;
  subtitle?: string;
  phoneNumber?: React.ReactNode;
  badge?: React.ReactNode;
  badgeVariant?: React.ComponentProps<typeof BadgeIcon>["variant"];
  badgeLabel?: React.ReactNode;
  className?: string;
}

function GridItemMedia({
  name,
  title,
  subtitle,
  phoneNumber,
  badge,
  badgeVariant,
  badgeLabel,
  className,
}: GridItemMediaProps) {
  const badgeNode = badge ? (
    <div className="shrink-0">{badge}</div>
  ) : badgeLabel ? (
    <BadgeIcon
      variant={badgeVariant}
      className="shrink-0"
      aria-label={typeof badgeLabel === "string" ? badgeLabel : undefined}
    >
      {badgeLabel}
    </BadgeIcon>
  ) : null;

  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-start justify-between gap-4",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <InitialsAvatar name={name} />

        <div className="min-w-0 flex-1 space-y-1 pt-1">
          <p className="truncate t-title-lg-soft text-main">{title}</p>
          {subtitle && (
            <p className="truncate t-body-md text-faint">{subtitle}</p>
          )}
          {phoneNumber && (
            <p className="truncate t-label-md text-faint">{phoneNumber}</p>
          )}
        </div>
      </div>

      {badgeNode}
    </div>
  );
}

function GridItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="grid-item-content"
      className={cn("min-w-0 space-y-3", className)}
      {...props}
    />
  );
}

function GridItemAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="outline"
      data-slot="grid-item-action"
      className={cn(
        "h-large w-large shrink-0 full-rounded border-stroke border-default bg-background text-main shadow-none",
        className,
      )}
      {...props}
    />
  );
}

interface GridItemInlineProps {
  icon?: React.ElementType;
  text: React.ReactNode;
  iconClassName?: string;
  textClassName?: string;
  className?: string;
}

function GridItemInline({
  icon: IconComponent,
  text,
  iconClassName,
  textClassName,
  className,
}: GridItemInlineProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {IconComponent && (
        <IconComponent className={cn("size-4 shrink-0", iconClassName)} />
      )}
      <span className={textClassName}>{text}</span>
    </div>
  );
}

interface GridItemStackedProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

function GridItemStacked({
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
  subtitleClassName,
}: GridItemStackedProps) {
  return (
    <div
      className={cn("space-y-1", align === "right" && "text-right", className)}
    >
      <p className={cn("t-body-lg text-faint", titleClassName)}>{title}</p>
      {subtitle && (
        <p className={cn("t-label-md text-faint", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface GridEmptyProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onRefresh?: () => void;
  border?: boolean;
  shadow?: boolean;
  className?: string;
}

interface GridEmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onRefresh?: () => void;
  className?: string;
}

function GridEmptyState({
  icon: EmptyIcon,
  title,
  description,
  actionLabel = "Refresh",
  onRefresh,
  className,
}: GridEmptyStateProps) {
  return (
    <div
      data-slot="grid-empty-state"
      className={cn(
        "flex flex-col items-center justify-center py-8 text-center",
        className,
      )}
    >
      <div className="surface-page mb-5 flex h-extra-large w-extra-large items-center justify-center full-rounded">
        <span className="inline-flex items-center justify-center text-faint [&>svg]:size-7 [&>svg]:shrink-0">
          <EmptyIcon />
        </span>
      </div>

      <div className="max-w-3xl space-y-2">
        <p className="t-title-lg-soft text-main">{title}</p>
        <p className="t-body-lg text-faint">{description}</p>
      </div>

      <Button
        variant="outline"
        className="mt-4 h-large px-6 t-body-md"
        onClick={onRefresh}
      >
        <Icon.RefreshCw />
        {actionLabel}
      </Button>
    </div>
  );
}

function GridEmpty({
  icon,
  title,
  description,
  actionLabel,
  onRefresh,
  border = false,
  shadow = false,
  className,
}: GridEmptyProps) {
  return (
    <GridItem
      border={border}
      shadow={shadow}
      className={cn(
        "table-empty gap-0 overflow-hidden p-0 md:col-span-2",
        className,
      )}
    >
      <GridEmptyState
        icon={icon}
        title={title}
        description={description}
        actionLabel={actionLabel}
        onRefresh={onRefresh}
      />
    </GridItem>
  );
}

export {
  Grid,
  GridItem,
  GridItemHeader,
  GridItemBody,
  GridItemMedia,
  GridItemContent,
  GridItemAction,
  GridItemInline,
  GridItemStacked,
  GridEmpty,
  GridEmptyState,
};
