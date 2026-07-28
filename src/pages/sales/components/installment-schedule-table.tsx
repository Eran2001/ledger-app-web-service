import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Fallback } from "@/components/ui/fallback";

import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import type { InstallmentSchedule } from "@/types/installment-types";

interface InstallmentScheduleTableProps {
  schedules: InstallmentSchedule[];
  statLabel: string;
  onRecordPayment: (installmentId: string) => void;
}

export function InstallmentScheduleTable({
  schedules,
  statLabel,
  onRecordPayment,
}: InstallmentScheduleTableProps) {
  return (
    <Table
      variant="simple"
      layout="fixed"
      caption="Installment Schedule"
      statLabel={statLabel}
      statColor="indigo"
      border
      shadow
    >
      <colgroup>
        <col className="w-[8%]" />
        <col className="w-[20%]" />
        <col className="w-[15%]" />
        <col className="w-[15%]" />
        <col className="w-[15%]" />
        <col className="w-[12%]" />
        <col className="w-[15%]" />
      </colgroup>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Expected</TableHead>
          <TableHead>Paid</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.map((schedule) => {
          const balance = schedule.expectedAmount - schedule.paidAmount;
          const isPaid = schedule.status === "PAID";
          const rowClass =
            schedule.status === "PARTIALLY_PAID"
              ? "surface-warning-soft"
              : schedule.status === "OVERDUE"
                ? "surface-overdue-row"
                : "";

          return (
            <TableRow key={schedule.id} done={isPaid} className={rowClass}>
              <TableCell>{schedule.installmentNumber}</TableCell>
              <TableCell>{formatDate(schedule.dueDate)}</TableCell>
              <TableCell>{formatCurrency(schedule.expectedAmount)}</TableCell>
              <TableCell>{formatCurrency(schedule.paidAmount)}</TableCell>
              <TableCell>
                {balance > 0 ? formatCurrency(balance) : <Fallback />}
              </TableCell>
              <TableCell>
                {isPaid ? (
                  <Icon.BadgeCheck className="icon-default" />
                ) : (
                  <StatusBadge status={schedule.status} />
                )}
              </TableCell>
              <TableCell className="text-right">
                {!isPaid ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <Icon.MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" border shadow>
                      <DropdownMenuItem
                        onClick={() => onRecordPayment(schedule.id)}
                      >
                        <Icon.Wallet /> Record Payment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
