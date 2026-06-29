import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCellMedia,
} from "@/components/ui/table";

import { customerById } from "@/constant/customer-data";
import { productById } from "@/constant/product-data";
import { installmentSchedules, payments, sales } from "@/constant/sale-data";
import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";

const recentPayments = [...payments]
  .sort(
    (a, b) => new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime(),
  )
  .slice(0, 6)
  .map((p) => {
    const sched = installmentSchedules.find(
      (s) => s.id === p.installmentScheduleId,
    );
    const sale = sched ? sales.find((s) => s.id === sched.saleId) : undefined;
    const customer = sale ? customerById(sale.customerId) : undefined;
    const product = sale ? productById(sale.productId) : undefined;
    const status = (sched?.status ?? "PAID") as
      | "PAID"
      | "PARTIALLY_PAID"
      | "OVERDUE"
      | "PENDING";
    return {
      id: p.id,
      customer: customer?.fullName ?? "Unknown",
      product: product?.name ?? "—",
      amount: p.paidAmount,
      date: p.paidDate,
      status,
    };
  });

export const RecentPayments = () => {
  return (
    <div className="xl:col-span-3">
      <Table
        variant="simple"
        caption="Recent Payments"
        actionLabel="View All"
        actionTo="/sales"
      >
        <TableHeader>
          <TableRow>
            <TableHead variant="simple">Customer</TableHead>
            <TableHead variant="simple">Product</TableHead>
            <TableHead variant="simple">Amount</TableHead>
            <TableHead variant="simple">Date</TableHead>
            <TableHead variant="simple">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentPayments.map((p) => (
            <TableRow key={p.id}>
              <TableCell variant="simple">
                <TableCellMedia name={p.customer} title={p.customer} />
              </TableCell>
              <TableCell variant="simple">{p.product}</TableCell>
              <TableCell variant="simple">{formatCurrency(p.amount)}</TableCell>
              <TableCell variant="simple">{formatDate(p.date)}</TableCell>
              <TableCell variant="simple">
                <StatusBadge status={p.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
