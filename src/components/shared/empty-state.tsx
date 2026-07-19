import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  border?: boolean;
  shadow?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
  border = false,
  shadow = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "surface-card global-rounded",
        border && "border-stroke border-default",
        shadow && "shadow-card",
        "flex flex-col items-center justify-center text-center",
        "px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24",
        "4xl:px-28 5xl:px-32 6xl:px-40 7xl:px-48 8xl:px-56",
        "py-16 sm:py-18 md:py-20 lg:py-24 xl:py-28 2xl:py-32",
        "3xl:py-36 4xl:py-40 5xl:py-48 6xl:py-56 7xl:py-64 8xl:py-72",
      )}
    >
      <div
        className={cn(
          "surface-brand-soft global-rounded",
          "size-16 sm:size-18 md:size-20 lg:size-20 xl:size-24",
          "2xl:size-24 3xl:size-28 4xl:size-28",
          "5xl:size-32 6xl:size-36 7xl:size-40 8xl:size-44",
          "flex items-center justify-center",
          "mb-4 sm:mb-5 md:mb-6 lg:mb-4 2xl:mb-8 3xl:mb-10",
          "4xl:mb-10 5xl:mb-12 6xl:mb-14 7xl:mb-16 8xl:mb-16",
        )}
      >
        <Icon
          className={cn(
            "text-brand",
            "size-12 sm:size-12 md:size-14 lg:size-16 xl:size-16 2xl:size-20 3xl:size-20",
            "4xl:size-24 5xl:size-24 6xl:size-28 7xl:size-32 8xl:size-36",
            "p-2 md:p-2.5 lg:p-3 xl:p-3 2xl:p-4 3xl:p-4 4xl:p-5 5xl:p-5 6xl:p-6 7xl:p-6 8xl:p-7",
          )}
          strokeWidth={1.5}
        />
      </div>
      <p
        className={cn(
          "t-body-lg fw-semibold text-main",
          "mb-1 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-2 2xl:mb-2",
          "3xl:mb-3 4xl:mb-3 5xl:mb-4 6xl:mb-4 7xl:mb-5 8xl:mb-5",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "t-body-lg text-faint",
          "max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm 2xl:max-w-2xl",
          "3xl:max-w-3xl 4xl:max-w-3xl 5xl:max-w-4xl 6xl:max-w-4xl 7xl:max-w-5xl 8xl:max-w-5xl",
        )}
      >
        {subtitle}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className={cn("mt-6")}>
          {ActionIcon && <ActionIcon />}
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
