import * as React from "react";

import * as Icon from "@/components/icons";
import { BadgeIcon } from "@/components/ui/badge-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { SyncedHeightPair } from "@/components/shared/synced-height-pair";
import { useWidth } from "@/hooks/use-width";
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

function GridItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card
      border
      data-slot="grid-item"
      className={cn("gap-5 rounded-4xl px-4 py-4 sm:px-5", className)}
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
  const { width, breakpoints } = useWidth();
  const isMaxXxs = width < breakpoints.xxs;
  const isMaxSm = width < breakpoints.sm;
  const detailCount =
    1 + Number(Boolean(subtitle)) + Number(Boolean(phoneNumber));
  const avatarSize = detailCount >= 3 ? "auto" : "lg";
  const badgeNode = badge ? (
    <div className="shrink-0">{badge}</div>
  ) : badgeLabel ? (
    <BadgeIcon
      variant={badgeVariant}
      className={cn("shrink-0", isMaxSm && "px-1.5")}
      aria-label={typeof badgeLabel === "string" ? badgeLabel : undefined}
    >
      {isMaxSm ? null : badgeLabel}
    </BadgeIcon>
  ) : null;

  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-start justify-between gap-4",
        className,
      )}
    >
      {!isMaxXxs &&
        (avatarSize === "auto" ? (
          <SyncedHeightPair
            left={<InitialsAvatar name={name} size="auto" />}
            right={
              <div className="min-w-0 space-y-1 pt-1">
                <p className="truncate t-title-lg-soft text-main">{title}</p>
                {subtitle && (
                  <p className="truncate t-body-md text-faint">{subtitle}</p>
                )}
                {phoneNumber && (
                  <p className="truncate t-label-md text-faint">
                    {phoneNumber}
                  </p>
                )}
              </div>
            }
            squareLeft
            className="flex-1"
          />
        ) : (
          <div className="flex min-w-0 items-start gap-4">
            <InitialsAvatar name={name} size="lg" />

            <div className="min-w-0 space-y-1 pt-1">
              <p className="truncate t-title-lg-soft text-main">{title}</p>
              {subtitle && (
                <p className="truncate t-body-md text-faint">{subtitle}</p>
              )}
              {phoneNumber && (
                <p className="truncate t-label-md text-faint">{phoneNumber}</p>
              )}
            </div>
          </div>
        ))}

      {isMaxXxs && (
        <div className="min-w-0 flex-1 space-y-1 pt-1">
          <p className="truncate t-title-lg-soft text-main">{title}</p>
          {subtitle && (
            <p className="truncate t-body-md text-faint">{subtitle}</p>
          )}
          {phoneNumber && (
            <p className="truncate t-label-md text-faint">{phoneNumber}</p>
          )}
        </div>
      )}

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
      size="icon"
      data-slot="grid-item-action"
      className={cn(
        "size-11 shrink-0 rounded-full border-default bg-background text-main shadow-none",
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
      <div className="surface-page mb-5 flex size-14 items-center justify-center full-rounded">
        <EmptyIcon className="size-7 text-faint" />
      </div>

      <div className="max-w-3xl space-y-2">
        <p className="t-title-lg-soft text-main">{title}</p>
        <p className="t-body-lg text-faint">{description}</p>
      </div>

      <Button variant="outline" size="lg" className="mt-4" onClick={onRefresh}>
        <Icon.RefreshCw className="size-4" />
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
  className,
}: GridEmptyProps) {
  return (
    <GridItem
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
