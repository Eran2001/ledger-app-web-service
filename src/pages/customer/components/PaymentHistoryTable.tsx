import { productById, sales } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";

type Payment = {
  id: string;
  saleId: string;
  paidDate: string;
  paidAmount: number;
  recordedBy: string;
  notes?: string | null;
};

export default function PaymentHistoryTable({
  payments,
}: {
  payments: Payment[];
}) {
  return (
    <div className="surface-card card-rounded border border-default shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-left">Recorded By</th>
              <th className="px-6 py-3 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => {
              const sale = sales.find((s) => s.id === p.saleId);
              const prod = sale ? productById(sale.productId) : undefined;
              return (
                <tr
                  key={p.id}
                  className="border-t border-default surface-hover"
                >
                  <td className="px-6 py-3 table-text">
                    {formatDate(p.paidDate)}
                  </td>
                  <td className="px-6 py-3 table-title-text">{prod?.name}</td>
                  <td className="px-6 py-3 text-right t-meta-bold text-main">
                    {formatCurrency(p.paidAmount)}
                  </td>
                  <td className="px-6 py-3 table-text">{p.recordedBy}</td>
                  <td className="px-6 py-3 table-text">{p.notes ?? "—"}</td>
                </tr>
              );
            })}
            {payments.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center t-body text-faint"
                >
                  No payment history yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
