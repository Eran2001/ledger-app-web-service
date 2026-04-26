import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calculator, Minus, ArrowLeft } from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customers, products } from "@/constant/dummy";
import { formatCurrency, formatDate } from "@/lib/utils";

import { addMonths } from "date-fns";
import { DatePickerInput } from "@/components/ui/date-picker-input";

export const NewSalePage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [soldPrice, setSoldPrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [months, setMonths] = useState<number>(10);
  const [saleDate, setSaleDate] = useState<Date>(new Date());

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleProductChange = (val: string) => {
    setSelectedProductId(val);
    const p = products.find((prod) => prod.id === val);
    if (p) setSoldPrice(p.basePrice);
  };

  const remainingBalance = Math.max(0, soldPrice - downPayment);
  const monthlyAmount = months > 0 ? Math.ceil(remainingBalance / months) : 0;

  const previewSchedule = useMemo(() => {
    const schedule = [];
    const start = saleDate;
    for (let i = 1; i <= months; i++) {
      schedule.push({
        num: i,
        due: addMonths(start, i),
        amount:
          i === months
            ? remainingBalance - monthlyAmount * (months - 1)
            : monthlyAmount,
      });
    }
    return schedule;
  }, [months, saleDate, remainingBalance, monthlyAmount]);

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar pageTitle="New Sale" pageSubtitle="Create installment sale" />

      <div className="p-6 overflow-y-auto">
        <button
          onClick={() => navigate("/sales")}
          className="mb-4 t-caption fw-bold text-brand flex items-center gap-1 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back to sales
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Form Side */}
          <div className="xl:col-span-3 surface-card modal-rounded border border-border p-8 shadow-sm">
            <div className="flex items-center gap-3 border-l-4 border-brand pl-4 mb-8">
              <h3 className="t-section text-main">Customer & Product</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="t-body fw-semibold text-soft">
                  Select Customer
                </Label>
                <Select
                  value={selectedCustomerId}
                  onValueChange={setSelectedCustomerId}
                >
                  <SelectTrigger className="h-11 border-border">
                    <SelectValue placeholder="Search customers..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.fullName} ({c.phone})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button className="text-brand t-caption fw-bold hover:underline">
                  + Add New Customer
                </button>
              </div>

              <div className="space-y-2">
                <Label className="t-body fw-semibold text-soft">
                  Select Product
                </Label>
                <Select
                  value={selectedProductId}
                  onValueChange={handleProductChange}
                >
                  <SelectTrigger className="h-11 border-border">
                    <SelectValue placeholder="Select a product..." />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedProduct && (
                  <p className="t-micro text-faint fw-medium">
                    Standard Price: {formatCurrency(selectedProduct.basePrice)}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-border mt-8">
                <div className="flex items-center gap-3 border-l-4 border-brand pl-4 mb-8">
                  <h3 className="t-section text-main">Sale Terms</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="t-body fw-semibold text-soft">
                      Sold Price (LKR)
                    </Label>
                    <Input
                      type="number"
                      value={soldPrice}
                      onChange={(e) => setSoldPrice(Number(e.target.value))}
                      className="h-11 border-border fw-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="t-body fw-semibold text-soft">
                      Down Payment (LKR)
                    </Label>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="h-11 border-border fw-bold text-success-role"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="t-body fw-semibold text-soft">
                      Number of Months
                    </Label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        className="w-11 h-11 border-border shrink-0"
                        onClick={() => setMonths(Math.max(1, months - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="h-11 border-border align-text-center fw-bold"
                      />
                      <Button
                        variant="outline"
                        className="w-11 h-11 border-border shrink-0"
                        onClick={() => setMonths(months + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <DatePickerInput
                      label="Sale Date"
                      value={saleDate}
                      onChange={(d) => d && setSaleDate(d)}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Label className="t-body fw-semibold text-soft">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    placeholder="Add any specific details about this sale..."
                    className="min-h-25 border-border"
                  />
                </div>

                <Button
                  className="w-full h-14 surface-brand surface-brand-strong-hover mt-10 t-body fw-bold shadow-xl shadow-brand-soft"
                  onClick={() => navigate("/sales")}
                >
                  Create Sale & Generate Schedule
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Side */}
          <div className="xl:col-span-2 space-y-6">
            <div className="surface-card modal-rounded border border-border p-6 shadow-sm sticky top-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <Calculator className="w-5 h-5 text-brand" />
                <h3 className="t-title text-main">Installment Preview</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center t-body fw-medium">
                  <span className="text-soft">Sold Price</span>
                  <span className="text-main">{formatCurrency(soldPrice)}</span>
                </div>
                <div className="flex justify-between items-center t-body fw-medium">
                  <span className="text-soft">Down Payment</span>
                  <span className="text-success-role border-b border-dashed border-success-muted pb-0.5">
                    -{formatCurrency(downPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-y border-border">
                  <span className="t-body fw-bold text-main">
                    Remaining Balance
                  </span>
                  <span className="t-body fw-black text-main">
                    {formatCurrency(remainingBalance)}
                  </span>
                </div>
                <div className="surface-brand-soft card-rounded p-4 flex justify-between items-center">
                  <span className="t-body fw-bold text-soft">
                    Monthly Payment
                  </span>
                  <span className="t-section fw-black text-brand">
                    {formatCurrency(monthlyAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center t-body fw-medium">
                  <span className="text-soft">Duration</span>
                  <span className="text-main">{months} months</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="t-micro fw-bold text-faint case-upper tracking-label-wide pl-1">
                  Generated Schedule
                </h4>
                <div className="max-h-75 overflow-y-auto pr-1">
                  <table className="w-full t-micro fw-medium">
                    <thead className="text-faint case-upper tracking-label sticky top-0 surface-card">
                      <tr>
                        <th className="align-text-left py-2 pl-2">#</th>
                        <th className="align-text-left py-2">Due Date</th>
                        <th className="align-text-right py-2 pr-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {previewSchedule.map((row) => (
                        <tr
                          key={row.num}
                          className="surface-hover transition-colors"
                        >
                          <td className="py-2.5 pl-2 text-faint fw-bold">
                            {row.num}
                          </td>
                          <td className="py-2.5 text-soft">
                            {formatDate(row.due)}
                          </td>
                          <td className="py-2.5 align-text-right pr-2 text-main fw-bold">
                            {formatCurrency(row.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="t-micro align-text-center text-faint italic mt-4 surface-page py-2 global-rounded">
                  Schedule will be saved upon submission
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
