import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, MessageCircle, Info } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  customers,
  sales,
  installmentSchedules,
  products,
  payments,
} from "@/constant/dummy";
import { formatCurrency, cn, formatDate } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const SaleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [paymentDate, setPaymentDate] = useState<Date>(new Date());
  const {
    activeModal,
    openModal,
    closeModal,
    setSelectedInstallment,
    selectedInstallmentId,
  } = useUIStore();

  const sale = sales.find((s) => s.id === id);
  if (!sale) return <div>Sale not found</div>;

  const customer = customers.find((c) => c.id === sale.customerId);
  const product = products.find((p) => p.id === sale.productId);
  const schedules = installmentSchedules.filter((is) => is.saleId === sale.id);
  const salePayments = payments.filter((p) =>
    schedules.map((s) => s.id).includes(p.installmentScheduleId),
  );

  const paidSchedules = schedules.filter((s) => s.status === "PAID");
  const totalPaid = schedules.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalExpected = schedules.reduce(
    (acc, curr) => acc + curr.expectedAmount,
    0,
  );
  const currentOutstanding = totalExpected - totalPaid;

  return (
    <div className="flex flex-col h-full bg-surface">
      <Topbar
        pageTitle={product?.name || "Sale Detail"}
        pageSubtitle={customer?.fullName || "Back to sales"}
        primaryAction={
          <Button
            onClick={() => {
              const pending = schedules.find((s) => s.status !== "PAID");
              if (pending) {
                setSelectedInstallment(pending.id);
                openModal("recordPayment");
              }
            }}
          >
            Record Payment
          </Button>
        }
      />

      <div className="p-6 overflow-y-auto">
        <button
          onClick={() => navigate("/sales")}
          className="mb-4 t-caption fw-bold text-primary flex items-center gap-1 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back to list
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Info */}
          <div className="bg-card modal-rounded border border-border p-6 shadow-sm">
            <h4 className="t-micro-bold text-body uppercase tracking-widest mb-4">
              Customer Information
            </h4>
            <div className="flex items-center gap-4 mb-6">
              <InitialsAvatar name={customer?.fullName || ""} size="md" />
              <div className="flex flex-col">
                <span className="t-body fw-bold text-heading">
                  {customer?.fullName}
                </span>
                <span className="t-caption text-body">
                  {customer?.nic} · {customer?.phone}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-10 border-border text-primary fw-bold"
              onClick={() => navigate(`/customers/${customer?.id}`)}
            >
              View Full Profile
            </Button>
          </div>

          {/* Sale Summary */}
          <div className="bg-card modal-rounded border border-border p-6 shadow-sm relative">
            <StatusBadge status={sale.status} className="absolute top-6 right-6" />
            <h4 className="t-micro-bold text-body uppercase tracking-widest mb-4">
              Sale Summary
            </h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex flex-col">
                <span className="t-micro text-hint fw-medium">Product</span>
                <span className="t-body fw-bold text-heading">{product?.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="t-micro text-hint fw-medium">Sold Price</span>
                <span className="t-body fw-bold text-heading">{formatCurrency(sale.soldPrice)}</span>
              </div>
              <div className="flex flex-col">
                <span className="t-micro text-hint fw-medium">Down Payment</span>
                <span className="t-body fw-bold text-success">{formatCurrency(sale.downPayment)}</span>
              </div>
              <div className="flex flex-col">
                <span className="t-micro text-hint fw-medium">Monthly Installment</span>
                <span className="t-body fw-bold text-heading">{formatCurrency(sale.monthlyAmount)}</span>
              </div>
              <div className="flex flex-col">
                <span className="t-micro text-hint fw-medium">Total Paid</span>
                <span className="t-body fw-bold text-heading">{formatCurrency(totalPaid)}</span>
              </div>
              <div className="flex flex-col">
                <span className="t-micro text-hint fw-medium">Outstanding</span>
                <span className="t-body fw-bold text-primary">{formatCurrency(currentOutstanding)}</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <span className="t-caption text-hint fw-medium italic">
                Sale Date: {formatDate(sale.saleDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-card modal-rounded border border-border shadow-sm mb-8 overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="t-title text-heading">Installment Schedule</h3>
            <span className="bg-primary-light text-primary t-caption fw-bold px-4 py-1.5 global-rounded">
              {paidSchedules.length} of {sale.totalMonths} paid ·{" "}
              {formatCurrency(currentOutstanding)} remaining
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface t-micro-bold text-body uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 border-b">#</th>
                  <th className="px-5 py-4 border-b">Due Date</th>
                  <th className="px-5 py-4 border-b">Expected</th>
                  <th className="px-5 py-4 border-b">Paid</th>
                  <th className="px-5 py-4 border-b">Balance</th>
                  <th className="px-5 py-4 border-b">Status</th>
                  <th className="px-5 py-4 border-b text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {schedules.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "group transition-colors",
                      row.status === "PAID"
                        ? "bg-surface/50"
                        : row.status === "PARTIALLY_PAID"
                          ? "bg-warning-bg/20"
                          : "bg-card",
                      row.status === "OVERDUE" && "bg-overdue-row",
                    )}
                  >
                    <td className="px-5 py-4 t-caption fw-bold text-hint">
                      {row.installmentNumber}
                    </td>
                    <td className={cn("px-5 py-4 t-body fw-medium", row.status === "PAID" ? "text-hint line-through" : "text-heading")}>
                      {formatDate(row.dueDate)}
                    </td>
                    <td className={cn("px-5 py-4 t-body", row.status === "PAID" ? "text-hint" : "fw-bold text-body")}>
                      {formatCurrency(row.expectedAmount)}
                    </td>
                    <td className={cn("px-5 py-4 t-body", row.status === "PAID" ? "text-hint" : "fw-bold text-success")}>
                      {formatCurrency(row.paidAmount)}
                    </td>
                    <td className="px-5 py-4 t-body fw-bold text-heading">
                      {formatCurrency(row.expectedAmount - row.paidAmount)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      {row.status !== "PAID" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="t-caption h-8 px-4 fw-bold border-primary/20 text-primary hover:bg-primary-light"
                          onClick={() => {
                            setSelectedInstallment(row.id);
                            openModal("recordPayment");
                          }}
                        >
                          Record Payment
                        </Button>
                      ) : (
                        <CheckCircle className="w-5 h-5 text-success ml-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History Timeline */}
        <div className="bg-card modal-rounded border border-border p-8 shadow-sm">
          <h3 className="t-title text-heading mb-8">Payment History</h3>
          <div className="relative ml-4">
            <div className="absolute -left-0.5 top-0 bottom-0 w-1 bg-primary-light rounded-full"></div>
            <div className="space-y-10">
              {salePayments.length > 0 ? (
                salePayments.map((p) => {
                  const schedule = schedules.find(
                    (s) => s.id === p.installmentScheduleId,
                  );
                  return (
                    <div key={p.id} className="relative pl-8 animate-in slide-in-from-left duration-300">
                      <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-card border-4 border-primary ring-4 ring-primary-light"></div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <span className="t-body fw-bold text-heading">{formatDate(p.paidDate)}</span>
                        <span className="hidden md:inline px-1 text-hint">·</span>
                        <span className="t-body fw-black text-primary">{formatCurrency(p.paidAmount)}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="t-micro fw-bold text-body bg-surface px-2 py-0.5 global-rounded uppercase">
                          Installment {schedule?.installmentNumber}
                        </span>
                        <span className="t-micro text-hint">
                          Recorded by{" "}
                          <span className="text-body fw-bold">{p.recordedBy}</span>
                        </span>
                      </div>
                      {p.notes && (
                        <div className="mt-3 p-3 bg-surface global-rounded border border-border max-w-sm flex gap-2 items-start">
                          <Info className="w-3.5 h-3.5 text-hint mt-0.5 shrink-0" />
                          <p className="t-caption text-body italic">{p.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="pl-8 text-hint t-body fw-medium">
                  No payments recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      <Dialog open={activeModal === "recordPayment"} onOpenChange={closeModal}>
        <DialogContent className="max-w-120 p-0 border-none auth-rounded overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-8 pb-0">
            <DialogHeader className="mb-6">
              <DialogTitle className="t-section fw-bold text-heading">
                Record Payment
              </DialogTitle>
            </DialogHeader>

            {(() => {
              const inst = schedules.find((s) => s.id === selectedInstallmentId);
              return (
                <>
                  <div className="bg-primary-light modal-rounded p-5 mb-8 flex justify-between items-center ring-1 ring-primary/20 shadow-sm">
                    <div>
                      <p className="t-micro fw-bold text-primary uppercase tracking-wider mb-0.5">
                        INSTALLMENT {inst?.installmentNumber} OF {sale.totalMonths}
                      </p>
                      <p className="t-caption fw-medium text-body">
                        Due: {inst ? formatDate(inst.dueDate) : "-"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="t-micro fw-bold text-hint uppercase">Remaining</p>
                      <p className="t-section fw-black text-primary">
                        {inst ? formatCurrency(inst.expectedAmount - inst.paidAmount) : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="t-body fw-bold text-body">Paid Amount (LKR)</Label>
                      <Input
                        type="number"
                        defaultValue={inst ? inst.expectedAmount - inst.paidAmount : 0}
                        className="h-12 t-section fw-black border-border"
                      />
                      <p className="t-micro text-hint fw-semibold pl-1">
                        Expected: {formatCurrency(inst?.expectedAmount || 0)} · Already paid: {formatCurrency(inst?.paidAmount || 0)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <DatePickerInput
                        label="Payment Date"
                        value={paymentDate}
                        onChange={(d) => d && setPaymentDate(d)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="t-body fw-bold text-body">Notes (Optional)</Label>
                      <Textarea
                        placeholder="e.g. customer will pay balance next visit"
                        className="min-h-25 border-border resize-none"
                      />
                    </div>

                    <div className="bg-surface modal-rounded p-5 flex items-center justify-between border border-border mt-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 card-rounded bg-success-bg flex items-center justify-center text-success">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="t-body fw-bold text-heading">Payment confirmation</span>
                          <span className="t-micro fw-medium text-hint uppercase tracking-wide">{customer?.phone}</span>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </>
              );
            })()}

            <div className="py-8 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 card-rounded border-border fw-bold text-body"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                className="flex-2 h-12 card-rounded bg-primary hover:bg-primary-dark fw-bold text-on-dark shadow-lg shadow-indigo-100"
                onClick={closeModal}
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
