import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { addMonths, format } from "date-fns";
import { ArrowLeft, Calculator, Minus, Plus, UserPlus } from "lucide-react";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { customers } from "@/constant/customer-data";
import { products } from "@/constant/product-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Notification } from "@/utils/notification";

export default function NewSalePage() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [soldPrice, setSoldPrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [months, setMonths] = useState<number>(6);
  const [saleDate, setSaleDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [notes, setNotes] = useState("");

  const product = products.find((p) => p.id === productId);

  const remaining = Math.max(0, soldPrice - downPayment);
  const monthly =
    months > 0 && remaining > 0 ? Math.ceil(remaining / months) : 0;

  const schedule = useMemo(() => {
    if (!monthly || !months) return [];
    const items = [];
    const start = new Date(saleDate);
    for (let i = 1; i <= months; i++) {
      items.push({ n: i, due: addMonths(start, i), amount: monthly });
    }
    return items;
  }, [monthly, months, saleDate]);

  function onProductChange(id: string) {
    setProductId(id);
    const p = products.find((x) => x.id === id);
    if (p) setSoldPrice(p.basePrice);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerId || !productId || soldPrice <= 0) {
      Notification.error("Please fill all required fields.");
      return;
    }
    Notification.success("Sale created and schedule generated.");
    setTimeout(() => navigate({ to: "/sales" }), 600);
  }

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="New Sale"
        pageSubtitle="Create a new installment sale"
      />
      <div className="p-6 overflow-y-auto">
        <Link
          to="/sales"
          className="inline-flex items-center gap-2 t-meta-bold text-brand mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to sales
        </Link>

        <form onSubmit={submit} className="grid gap-6 xl:grid-cols-5">
          {/* FORM */}
          <div className="xl:col-span-3">
            <div className="surface-card modal-rounded border border-default p-8 shadow-sm flex flex-col gap-7">
              {/* Customer & Product */}
              <SectionHeader>Customer & Product</SectionHeader>
              <div className="flex flex-col gap-2">
                <Label className="t-meta-bold text-main">Select customer</Label>
                <Select value={customerId} onValueChange={setCustomerId}>
                  <SelectTrigger className="h-11 control-rounded border-default text-main">
                    <SelectValue placeholder="Choose a customer…" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.fullName} · {c.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  className="t-caption-bold text-brand inline-flex items-center gap-1 self-start mt-1"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Add New Customer
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="t-meta-bold text-main">Select product</Label>
                <Select value={productId} onValueChange={onProductChange}>
                  <SelectTrigger className="h-11 control-rounded border-default text-main">
                    <SelectValue placeholder="Choose a product…" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} · {p.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {product && (
                  <p className="t-caption text-soft">
                    Standard price:{" "}
                    <span className="fw-bold text-main">
                      {formatCurrency(product.basePrice)}
                    </span>
                  </p>
                )}
              </div>

              {/* Sale Terms */}
              <SectionHeader>Sale Terms</SectionHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <Label className="t-meta-bold text-main">
                    Sold price (LKR)
                  </Label>
                  <Input
                    type="number"
                    value={soldPrice || ""}
                    onChange={(e) => setSoldPrice(Number(e.target.value))}
                    className="h-11 control-rounded border-default text-main"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="t-meta-bold text-main">
                    Down payment (LKR)
                  </Label>
                  <Input
                    type="number"
                    value={downPayment || ""}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="h-11 control-rounded border-default text-success-role"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="t-meta-bold text-main">
                    Number of months
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => setMonths(Math.max(1, months - 1))}
                      variant="outline"
                      className="h-11 w-11 control-rounded border-default p-0 bg-transparent"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={months}
                      onChange={(e) =>
                        setMonths(Math.max(1, Number(e.target.value)))
                      }
                      className="h-11 control-rounded border-default text-center text-main"
                    />
                    <Button
                      type="button"
                      onClick={() => setMonths(months + 1)}
                      variant="outline"
                      className="h-11 w-11 control-rounded border-default p-0 bg-transparent"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="t-meta-bold text-main">Sale date</Label>
                  <Input
                    type="date"
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    className="h-11 control-rounded border-default text-main"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="t-meta-bold text-main">
                  Notes (optional)
                </Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="control-rounded border-default min-h-25"
                  placeholder="Reminders, contact preferences, etc."
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 surface-brand text-inverse t-display-soft control-rounded surface-brand-strong-hover"
              >
                Create Sale & Generate Schedule
              </Button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="xl:col-span-2">
            <div className="surface-card modal-rounded border border-default p-6 shadow-sm sticky top-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="surface-brand-soft circle-rounded h-8 w-8 flex items-center justify-center">
                  <Calculator className="h-4 w-4 text-brand" />
                </div>
                <h3 className="t-heading text-main">Installment Preview</h3>
              </div>

              <div className="flex flex-col">
                <Row label="Sold Price" value={formatCurrency(soldPrice)} />
                <div className="flex justify-between items-center py-3 border-y border-dashed border-success-soft">
                  <span className="t-meta text-soft">Down Payment</span>
                  <span className="t-meta-bold text-success-role">
                    −{formatCurrency(downPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-default">
                  <span className="t-meta-bold text-main">
                    Remaining Balance
                  </span>
                  <span className="t-display text-main">
                    {formatCurrency(remaining)}
                  </span>
                </div>
                <div className="surface-brand-soft global-rounded p-4 mt-4 mb-3 flex justify-between items-center">
                  <span className="t-meta-bold text-brand">
                    Monthly Payment
                  </span>
                  <span className="t-section text-brand">
                    {formatCurrency(monthly)}
                  </span>
                </div>
                <Row label="Duration" value={`${months} months`} />
              </div>

              <div className="mt-5 pt-5 border-t border-default">
                <p className="t-micro-bold text-soft text-uppercase tracking-label mb-2">
                  Generated Schedule
                </p>
                <div className="max-h-75 overflow-y-auto -mx-2">
                  <table className="w-full">
                    <thead>
                      <tr className="t-micro text-faint text-uppercase tracking-label">
                        <th className="px-2 py-1.5 text-left">#</th>
                        <th className="px-2 py-1.5 text-left">Due Date</th>
                        <th className="px-2 py-1.5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.length === 0 ? (
                        <tr>
                          <td
                            colSpan={3}
                            className="px-2 py-6 text-center t-caption text-faint"
                          >
                            Enter sale details to preview schedule
                          </td>
                        </tr>
                      ) : (
                        schedule.map((s) => (
                          <tr key={s.n} className="border-t border-default">
                            <td className="px-2 py-2 t-caption text-faint">
                              {s.n}
                            </td>
                            <td className="px-2 py-2 t-caption text-soft">
                              {formatDate(s.due)}
                            </td>
                            <td className="px-2 py-2 text-right t-caption-bold text-main">
                              {formatCurrency(s.amount)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-brand pl-4">
      <h3 className="t-section text-main">{children}</h3>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3">
      <span className="t-meta text-soft">{label}</span>
      <span className="t-meta-bold text-main">{value}</span>
    </div>
  );
}
