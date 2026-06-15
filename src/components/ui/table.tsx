import * as React from "react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    return (
      <Card className="p-0 gap-0 overflow-hidden">
        {(caption || actionLabel) && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-default">
            {caption && <span className="t-display">{caption}</span>}
            {actionLabel && actionTo && (
              <Button variant="link" size="sm">
                <Link to={actionTo}>{actionLabel} →</Link>
              </Button>
            )}
          </div>
        )}
        {tableEl}
      </Card>
    );
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
      className={cn("border-b table-row", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-left align-middle whitespace-nowrap table-head",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "align-middle whitespace-nowrap table-cell",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className,
      )}
      {...props}
    />
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
  TableCaption,
};
