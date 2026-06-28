import { productById, sales } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment } from "@/types/customer";

export const PaymentHistoryTable = ({ payments }: { payments: Payment[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Recorded By</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="table-empty">
              No payment history yet.
            </TableCell>
          </TableRow>
        ) : (
          payments.map((p) => {
            const sale = sales.find((s) => s.id === p.saleId);
            const prod = sale ? productById(sale.productId) : undefined;
            return (
              <TableRow key={p.id}>
                <TableCell>{formatDate(p.paidDate)}</TableCell>
                <TableCell>{prod?.name}</TableCell>
                <TableCell>{formatCurrency(p.paidAmount)}</TableCell>
                <TableCell>{p.recordedBy}</TableCell>
                <TableCell>{p.notes ?? "—"}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
