import { useEffect, useState } from "react";
import { format } from "date-fns";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Notification } from "@/components/ui/custom-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { installmentSchedules, schedulesForSale } from "@/constant/sale-data";
import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";

interface Props {
  open: boolean;
  onClose: () => void;
  installmentId: string | null;
  customerPhone?: string;
}

export function RecordPaymentModal({
  open,
  onClose,
  installmentId,
  customerPhone,
}: Props) {
  const installment = installmentId
    ? installmentSchedules.find((s) => s.id === installmentId)
    : undefined;
  const total = installment ? schedulesForSale(installment.saleId).length : 0;
  const remaining = installment
    ? installment.expectedAmount - installment.paidAmount
    : 0;

  const [paidAmount, setPaidAmount] = useState<number>(remaining);
  const [paidDate, setPaidDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [notes, setNotes] = useState("");
  const [sendWa, setSendWa] = useState(true);

  useEffect(() => {
    if (installment) {
      setPaidAmount(installment.expectedAmount - installment.paidAmount);
      setPaidDate(format(new Date(), "yyyy-MM-dd"));
      setNotes("");
      setSendWa(true);
    }
  }, [installmentId, installment]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    Notification.success(`Payment of ${formatCurrency(paidAmount)} recorded.`);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-120 auth-rounded border-0 p-0 surface-card data-[state=open]:zoom-in-95">
        {installment && (
          <form onSubmit={submit} className="p-8 pb-0">
            <DialogTitle className="t-title-xl text-main fw-bold mb-1">
              Record Payment
            </DialogTitle>
            <DialogDescription className="t-label-md text-soft mb-5">
              Confirm the amount received from your customer.
            </DialogDescription>

            <div className="surface-brand-soft modal-rounded p-5 flex justify-between items-start mb-5">
              <div>
                <p className="t-label-sm-bold text-brand text-uppercase tracking-label">
                  Installment {installment.installmentNumber} of {total}
                </p>
                <p className="t-label-md text-soft mt-1">
                  Due: {formatDate(installment.dueDate)}
                </p>
              </div>
              <div className="text-right">
                <p className="t-label-sm-bold text-faint text-uppercase tracking-label">
                  Remaining
                </p>
                <p className="t-title-xl fw-black text-brand">
                  {formatCurrency(remaining)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="t-body-md-bold text-main">
                  Paid amount (LKR)
                </Label>
                <Input
                  type="number"
                  value={paidAmount || ""}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  className="h-12 control-rounded border-default t-title-xl fw-black text-main"
                />
                <p className="t-label-md text-faint">
                  Expected {formatCurrency(installment.expectedAmount)} ·
                  Already paid {formatCurrency(installment.paidAmount)}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="t-body-md-bold text-main">Payment date</Label>
                <Input
                  type="date"
                  value={paidDate}
                  onChange={(e) => setPaidDate(e.target.value)}
                  className="h-11 control-rounded border-default text-main"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="t-body-md-bold text-main">
                  Notes (optional)
                </Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="control-rounded border-default min-h-25"
                  placeholder="Customer comments…"
                />
              </div>

              <div className="surface-page modal-rounded p-5 border border-default flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="surface-success-soft circle-rounded h-10 w-10 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5 text-success-role" />
                  </div>
                  <div className="min-w-0">
                    <p className="t-body-md-bold text-main">
                      Payment confirmation
                    </p>
                    <p className="t-label-sm text-faint text-uppercase tracking-label truncate">
                      Send to {customerPhone ?? "customer"}
                    </p>
                  </div>
                </div>
                <Switch checked={sendWa} onCheckedChange={setSendWa} />
              </div>
            </div>

            <div className="flex gap-3 pt-6 pb-8 mt-2 -mx-8 px-8 border-t border-default">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 control-rounded border-default text-soft btn-base bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-2 h-12 surface-brand text-inverse btn-base control-rounded surface-brand-strong-hover shadow-brand-soft"
              >
                Confirm Payment
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
