import * as React from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { CardCaption } from "@/components/ui/card-caption";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { CategoryLabel } from "@/components/ui/category-label";

import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types/product-types";

function Table({
  className,
  variant = "main",
  caption,
  actionLabel,
  actionTo,
  ...props
}: React.ComponentProps<"table"> & {
  variant?: "main" | "simple";
  caption?: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  const isSimple = variant === "simple";

  const tableEl = (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto",
        !isSimple && "table-main-bleed",
      )}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full t-body-md",
          isSimple ? "table-simple" : "table-main",
          className,
        )}
        {...props}
      />
    </div>
  );

  if (isSimple) {
    if (caption) {
      return (
        <CardCaption
          title={caption}
          actionLabel={actionLabel}
          actionTo={actionTo}
        >
          {tableEl}
        </CardCaption>
      );
    }

    return (
      <Card border className="p-0 gap-0 overflow-hidden">
        {tableEl}
      </Card>
    );
  }

  return tableEl;
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn(className)} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t-stroke border-default fw-medium table-footer",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("table-row", className)}
      {...props}
    />
  );
}

function TableHead({
  className,
  variant,
  ...props
}: React.ComponentProps<"th"> & {
  variant?: "main" | "simple";
}) {
  return (
    <th
      data-slot="table-head"
      data-variant={variant}
      className={cn(
        "text-left align-middle whitespace-nowrap border-b-stroke border-default table-head h-field px-4 t-label-md-bold",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

interface TableCellProps extends React.ComponentProps<"td"> {
  accentBar?: boolean;
  variant?: "main" | "simple";
}

function TableCell({
  className,
  accentBar = false,
  children,
  variant,
  ...props
}: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-variant={variant}
      className={cn(
        "align-middle whitespace-nowrap h-medium-large px-4 t-body-md",
        accentBar && "relative",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className,
      )}
      {...props}
    >
      {accentBar && (
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-1 surface-danger"
        />
      )}
      {children}
    </td>
  );
}

function TableCellTruncate({ className, children, ...props }: TableCellProps) {
  return (
    <TableCell className={cn("max-w-70", className)} {...props}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="block truncate">{children}</span>
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TableCell>
  );
}

interface TableCellMediaProps {
  name: string;
  title: string;
  subtitle?: string;
}
function TableCellMedia({
  name,
  title,
  subtitle,
}: TableCellMediaProps) {
  return (
    <div className="flex items-center gap-3">
      <InitialsAvatar name={name} />
      {subtitle ? (
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="table-text table-subtext">{subtitle}</span>
        </div>
      ) : (
        <span>{title}</span>
      )}
    </div>
  );
}

interface TableCellCustomerProps {
  name: string;
  countryFlag: string;
  country: string;
  sessionCount: number;
}

function TableCellCustomer({
  name,
  countryFlag,
  country,
  sessionCount,
}: TableCellCustomerProps) {
  return (
    <div className="flex items-center gap-3">
      <InitialsAvatar name={name} />
      <div className="flex flex-col">
        <span>{name}</span>
        <span className="table-text table-subtext">
          {countryFlag} {country} · {sessionCount} session
          {sessionCount === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}

interface TableCellProductProps {
  name: string | undefined;
  category: ProductCategory | undefined;
}

function TableCellProduct({ name, category }: TableCellProductProps) {
  return (
    <div className="flex flex-col">
      <span className="table-title-text">{name}</span>
      {category && <CategoryLabel category={category} />}
    </div>
  );
}

interface TableCellStackedProps {
  title: string;
  subtitle?: string;
}

function TableCellStacked({ title, subtitle }: TableCellStackedProps) {
  return (
    <div className="flex flex-col">
      <span className="">{title}</span>
      {subtitle && <span className="table-text table-subtext">{subtitle}</span>}
    </div>
  );
}

interface TableCellInlineProps {
  icon?: React.ElementType;
  text: string;
  iconClassName?: string;
  textClassName?: string;
  className?: string;
}

function TableCellInline({
  icon: IconComponent,
  text,
  iconClassName,
  textClassName,
  className,
}: TableCellInlineProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {IconComponent && (
        <IconComponent className={cn("size-4", iconClassName)} />
      )}
      <span className={textClassName}>{text}</span>
    </div>
  );
}

interface TableEmptyProps {
  colSpan: number;
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onRefresh?: () => void;
}

interface TableEmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onRefresh?: () => void;
  className?: string;
}

function TableEmptyState({
  icon: EmptyIcon,
  title,
  description,
  actionLabel = "Refresh",
  onRefresh,
  className,
}: TableEmptyStateProps) {
  return (
    <div
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

function TableEmpty({
  colSpan,
  icon,
  title,
  description,
  actionLabel,
  onRefresh,
}: TableEmptyProps) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="table-empty p-0">
        <TableEmptyState
          icon={icon}
          title={title}
          description={description}
          actionLabel={actionLabel}
          onRefresh={onRefresh}
        />
      </TableCell>
    </TableRow>
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 t-body-md table-caption", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCellTruncate,
  TableCellMedia,
  TableCellCustomer,
  TableCellProduct,
  TableCellStacked,
  TableCellInline,
  TableEmpty,
  TableEmptyState,
  TableCaption,
};
