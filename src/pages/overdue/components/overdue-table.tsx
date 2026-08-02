import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";

import { overdueSeverity, type OverdueListProps } from "./overdue-list-types";

export function OverdueTable({
  rows,
  onRemind,
}: OverdueListProps) {
  return (
    <Table variant="main" layout="fixed">
      <colgroup>
        <col className="w-[26%]" />
        <col className="w-[16%]" />
        <col className="w-[15%]" />
        <col className="w-[15%]" />
        <col className="w-[15%]" />
        <col className="w-[13%]" />
      </colgroup>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Days Overdue</TableHead>
          <TableHead>Expected</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableEmpty
            colSpan={6}
            icon={Eye}
            title="No overdue payments"
            description="No overdue payments in this range."
          />
        ) : (
          rows.map((row) => {
            const severity = overdueSeverity(row.daysOverdue);

            return (
              <TableRow key={row.scheduleId} className={severity.row}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={row.customerName} />
                    <div className="min-w-0">
                      <p className="table-title-text truncate">{row.customerName}</p>
                      <p className="t-label-sm text-faint font-mono">
                        {row.customerPhone}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{formatDate(row.dueDate)}</TableCell>
                <TableCell>
                  <span className={`fw-black ${severity.text}`}>
                    {row.daysOverdue} days
                  </span>
                </TableCell>
                <TableCell>
                  <span className="table-title-text fw-bold">
                    {formatCurrency(row.expectedAmount)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className="flex items-center justify-end"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="focus-visible:shadow-none"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Icon.MoreHorizontal />
                          <span className="sr-only">Actions for {row.customerName}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        onClick={(event) => event.stopPropagation()}
                        border
                        shadow
                      >
                        <DropdownMenuItem onClick={() => onRemind(row.customerName)}>
                          <Icon.Bell /> Remind
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/sales/$id" params={{ id: row.saleId }}>
                            <Icon.Eye /> View
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
