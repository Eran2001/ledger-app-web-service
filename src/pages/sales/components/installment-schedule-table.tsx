import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
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
      caption="Installment Schedule"
      statLabel={statLabel}
      statColor="indigo"
      border
      shadow
    >
      <TableHeader>
        <TableRow>
          <TableHead variant="simple">#</TableHead>
          <TableHead variant="simple">Due Date</TableHead>
          <TableHead variant="simple">Expected</TableHead>
          <TableHead variant="simple">Paid</TableHead>
          <TableHead variant="simple">Balance</TableHead>
          <TableHead variant="simple">Status</TableHead>
          <TableHead variant="simple">Action</TableHead>
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
              <TableCell variant="simple">
                {schedule.installmentNumber}
              </TableCell>
              <TableCell variant="simple">
                {formatDate(schedule.dueDate)}
              </TableCell>
              <TableCell variant="simple">
                {formatCurrency(schedule.expectedAmount)}
              </TableCell>
              <TableCell variant="simple">
                {formatCurrency(schedule.paidAmount)}
              </TableCell>
              <TableCell variant="simple">
                {balance > 0 ? formatCurrency(balance) : "—"}
              </TableCell>
              <TableCell variant="simple">
                {isPaid ? (
                  <Icon.BadgeCheck className="size-5" />
                ) : (
                  <StatusBadge status={schedule.status} />
                )}
              </TableCell>
              <TableCell variant="simple">
                {!isPaid ? (
                  <Button
                    variant="outline"
                    onClick={() => onRecordPayment(schedule.id)}
                  >
                    Record Payment
                  </Button>
                ) : (
                  <Fallback />
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
