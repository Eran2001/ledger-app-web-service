import React from "react";
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
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const SaleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
    sitemSchedules().includes(p.installmentScheduleId),
  );

  function sitemSchedules() {
    return schedules.map((s) => s.id);
  }

  const paidSchedules = schedules.filter((s) => s.status === "PAID");
  const totalPaid = schedules.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const outstanding = schedules.reduce(
    (acc, curr) => acc + (acc + curr.expectedAmount - curr.paidAmount),
    0,
  ); // Bug in logic? No, let's fix.

  const totalExpected = schedules.reduce(
    (acc, curr) => acc + curr.expectedAmount,
    0,
  );
  const currentOutstanding = totalExpected - totalPaid;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar
        pageTitle={product?.name || "Sale Detail"}
        pageSubtitle={customer?.fullName || "Back to sales"}
        primaryAction={
          <Button
            className="bg-[#4F46E5] hover:bg-primary-dark"
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
          className="mb-4 text-xs font-bold text-[#4F46E5] flex items-center gap-1 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back to list
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Info */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h4 className="text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-4">
              Customer Information
            </h4>
            <div className="flex items-center gap-4 mb-6">
              <InitialsAvatar name={customer?.fullName || ""} size="md" />
              <div className="flex flex-col">
                <span className="font-bold text-[#0F172A]">
                  {customer?.fullName}
                </span>
                <span className="text-xs text-[#475569]">
                  {customer?.nic} · {customer?.phone}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-10 border-slate-200 text-[#4F46E5] font-bold"
              onClick={() => navigate(`/customers/${customer?.id}`)}
            >
              View Full Profile
            </Button>
          </div>

          {/* Sale Summary */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm relative">
            <StatusBadge
              status={sale.status}
              className="absolute top-6 right-6"
            />
            <h4 className="text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-4">
              Sale Summary
            </h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] font-medium">
                  Product
                </span>
                <span className="text-sm font-bold text-[#0F172A]">
                  {product?.name}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] font-medium">
                  Sold Price
                </span>
                <span className="text-sm font-bold text-[#0F172A]">
                  {formatCurrency(sale.soldPrice)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] font-medium">
                  Down Payment
                </span>
                <span className="text-sm font-bold text-green-600">
                  {formatCurrency(sale.downPayment)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] font-medium">
                  Monthly Installment
                </span>
                <span className="text-sm font-bold text-[#0F172A]">
                  {formatCurrency(sale.monthlyAmount)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] font-medium">
                  Total Paid
                </span>
                <span className="text-sm font-bold text-[#0F172A]">
                  {formatCurrency(totalPaid)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] font-medium">
                  Outstanding
                </span>
                <span className="text-sm font-bold text-[#4F46E5]">
                  {formatCurrency(currentOutstanding)}
                </span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-medium italic">
                Sale Date: {formatDate(sale.saleDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm mb-8 overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
            <h3 className="font-bold text-[#0F172A]">Installment Schedule</h3>
            <span className="bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold px-4 py-1.5 rounded-full">
              {paidSchedules.length} of {sale.totalMonths} paid ·{" "}
              {formatCurrency(currentOutstanding)} remaining
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F8FAFC] text-[10px] text-[#475569] uppercase tracking-wider font-bold">
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
              <tbody className="divide-y divide-[#E2E8F0]">
                {schedules.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "group transition-colors",
                      row.status === "PAID"
                        ? "bg-slate-50/50"
                        : row.status === "PARTIALLY_PAID"
                          ? "bg-amber-50/50"
                          : "bg-white",
                      row.status === "OVERDUE" && "bg-red-50/50",
                    )}
                  >
                    <td className="px-5 py-4 text-xs font-bold text-slate-400">
                      {row.installmentNumber}
                    </td>
                    <td
                      className={cn(
                        "px-5 py-4 text-sm font-medium",
                        row.status === "PAID"
                          ? "text-slate-400 line-through"
                          : "text-[#0F172A]",
                      )}
                    >
                      {formatDate(row.dueDate)}
                    </td>
                    <td
                      className={cn(
                        "px-5 py-4 text-sm",
                        row.status === "PAID"
                          ? "text-slate-400"
                          : "font-bold text-[#475569]",
                      )}
                    >
                      {formatCurrency(row.expectedAmount)}
                    </td>
                    <td
                      className={cn(
                        "px-5 py-4 text-sm",
                        row.status === "PAID"
                          ? "text-slate-400"
                          : "font-bold text-green-600",
                      )}
                    >
                      {formatCurrency(row.paidAmount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-[#0F172A]">
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
                          className="text-xs h-8 px-4 font-bold border-indigo-100 text-[#4F46E5] hover:bg-[#EEF2FF]"
                          onClick={() => {
                            setSelectedInstallment(row.id);
                            openModal("recordPayment");
                          }}
                        >
                          Record Payment
                        </Button>
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History Timeline */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
          <h3 className="font-bold text-[#0F172A] mb-8">Payment History</h3>
          <div className="relative ml-4">
            <div className="absolute left-[-2px] top-0 bottom-0 w-1 bg-[#EEF2FF] rounded-full"></div>
            <div className="space-y-10">
              {salePayments.length > 0 ? (
                salePayments.map((p) => {
                  const schedule = schedules.find(
                    (s) => s.id === p.installmentScheduleId,
                  );
                  return (
                    <div
                      key={p.id}
                      className="relative pl-8 animate-in slide-in-from-left duration-300"
                    >
                      <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#4F46E5] ring-4 ring-indigo-50"></div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <span className="text-sm font-bold text-[#0F172A]">
                          {formatDate(p.paidDate)}
                        </span>
                        <span className="hidden md:inline px-1 text-slate-300">
                          ·
                        </span>
                        <span className="text-base font-black text-[#4F46E5]">
                          {formatCurrency(p.paidAmount)}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[11px] font-bold text-[#475569] bg-slate-100 px-2 py-0.5 rounded uppercase">
                          Installment {schedule?.installmentNumber}
                        </span>
                        <span className="text-[11px] text-[#94A3B8]">
                          Recorded by{" "}
                          <span className="text-[#475569] font-bold">
                            {p.recordedBy}
                          </span>
                        </span>
                      </div>
                      {p.notes && (
                        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 max-w-sm flex gap-2 items-start">
                          <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-[#475569] italic">
                            {p.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="pl-8 text-slate-400 text-sm font-medium">
                  No payments recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      <Dialog open={activeModal === "recordPayment"} onOpenChange={closeModal}>
        <DialogContent className="max-w-[480px] p-0 border-none rounded-3xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-8 pb-0">
            <DialogHeader className="mb-6 flex flex-row items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[#0F172A]">
                Record Payment
              </DialogTitle>
            </DialogHeader>

            {(() => {
              const inst = schedules.find(
                (s) => s.id === selectedInstallmentId,
              );
              return (
                <>
                  <div className="bg-[#EEF2FF] rounded-2xl p-5 mb-8 flex justify-between items-center ring-1 ring-indigo-100 shadow-sm">
                    <div>
                      <p className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider mb-0.5">
                        INSTALLMENT {inst?.installmentNumber} OF{" "}
                        {sale.totalMonths}
                      </p>
                      <p className="text-xs font-medium text-[#475569]">
                        Due: {inst ? formatDate(inst.dueDate) : "-"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-[#94A3B8] uppercase">
                        Remaining
                      </p>
                      <p className="text-xl font-black text-[#4F46E5]">
                        {inst
                          ? formatCurrency(
                              inst.expectedAmount - inst.paidAmount,
                            )
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">
                        Paid Amount (LKR)
                      </Label>
                      <Input
                        type="number"
                        defaultValue={
                          inst ? inst.expectedAmount - inst.paidAmount : 0
                        }
                        className="h-12 text-lg font-black border-slate-200 focus:ring-primary focus:border-primary transition-all"
                      />
                      <p className="text-[10px] text-[#94A3B8] font-semibold pl-1">
                        Expected: {formatCurrency(inst?.expectedAmount || 0)} ·
                        Already paid: {formatCurrency(inst?.paidAmount || 0)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">
                        Payment Date
                      </Label>
                      <Input
                        type="date"
                        defaultValue={format(new Date(), "yyyy-MM-dd")}
                        className="h-12 border-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">
                        Notes (Optional)
                      </Label>
                      <Textarea
                        placeholder="e.g. customer will pay balance next visit"
                        className="min-h-[100px] border-slate-200 resize-none"
                      />
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 flex items-center justify-between border border-slate-100 mt-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">
                            Payment confirmation
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                            {customer?.phone}
                          </span>
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
                className="flex-1 h-12 rounded-xl border-slate-200 font-bold text-slate-600"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                className="flex-[2] h-12 rounded-xl bg-[#4F46E5] hover:bg-primary-dark font-bold text-white shadow-lg shadow-indigo-100"
                onClick={() => {
                  closeModal();
                  // In a real app we'd dispatch an update action
                }}
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
