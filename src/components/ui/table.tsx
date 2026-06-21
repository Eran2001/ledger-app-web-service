import * as React from "react";

import { Card } from "@/components/ui/card";
import { CardCaption } from "@/components/shared/card-caption";
import { InitialsAvatar } from "@/components/shared/initials-avatar";

import { cn } from "@/lib/utils";

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
  const tableEl = (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full t-meta",
          variant === "simple" ? "table-simple" : "table-striped",
          className,
        )}
        {...props}
      />
    </div>
  );

  if (variant === "simple") {
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

    return <Card className="p-0 gap-0 overflow-hidden">{tableEl}</Card>;
  }

  return tableEl;
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t fw-medium table-footer",
        "[&>tr]:last:border-b-0",
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

interface TableHeadProps extends React.ComponentProps<"th"> {
  variant?: "striped" | "simple";
}

function TableHead({
  className,
  variant = "striped",
  ...props
}: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-left align-middle whitespace-nowrap border-b border-default table-head",
        variant === "simple" ? "h-large px-4" : "h-extra-large px-4",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

interface TableCellProps extends React.ComponentProps<"td"> {
  variant?: "striped" | "simple";
}

function TableCell({
  className,
  variant = "striped",
  ...props
}: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "align-middle whitespace-nowrap",
        variant === "simple" ? "h-extra-large px-4" : "h-extra-large px-4",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

interface TableCellMediaProps {
  name: string;
  title: string;
  subtitle?: string;
  avatarSize?: "sm" | "md" | "lg";
}

function TableCellMedia({
  name,
  title,
  subtitle,
  avatarSize = "sm",
}: TableCellMediaProps) {
  return (
    <div className="flex items-center gap-3">
      <InitialsAvatar name={name} size={avatarSize} />
      {subtitle ? (
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="table-text">{subtitle}</span>
        </div>
      ) : (
        <span>{title}</span>
      )}
    </div>
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 t-meta table-caption", className)}
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
  TableCellMedia,
  TableCaption,
};
