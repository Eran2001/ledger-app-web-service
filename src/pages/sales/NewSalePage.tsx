import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calculator, Minus, ArrowLeft } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
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
import { formatCurrency, cn, formatDate } from "@/lib/utils";
import { addMonths, format } from "date-fns";

export const NewSalePage: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [soldPrice, setSoldPrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [months, setMonths] = useState<number>(10);
  const [saleDate, setSaleDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd"),
  );

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Sync soldPrice with product base price when selected
  const handleProductChange = (val: string) => {
    setSelectedProductId(val);
    const p = products.find((prod) => prod.id === val);
    if (p) {
      setSoldPrice(p.basePrice);
    }
  };

  // Derived values
  const remainingBalance = Math.max(0, soldPrice - downPayment);
  const monthlyAmount = months > 0 ? Math.ceil(remainingBalance / months) : 0;

  const previewSchedule = useMemo(() => {
    const schedule = [];
    const start = new Date(saleDate);
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
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <Topbar pageTitle="New Sale" pageSubtitle="Create installment sale" />

      <div className="p-6 overflow-y-auto">
        <button
          onClick={() => navigate("/sales")}
          className="mb-4 text-xs font-bold text-[#4F46E5] flex items-center gap-1 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back to sales
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Form Side */}
          <div className="xl:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
            <div className="flex items-center gap-3 border-l-4 border-[#4F46E5] pl-4 mb-8">
              <h3 className="font-bold text-lg text-[#0F172A]">
                Customer & Product
              </h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">
                  Select Customer
                </Label>
                <Select
                  value={selectedCustomerId}
                  onValueChange={setSelectedCustomerId}
                >
                  <SelectTrigger className="h-11 border-slate-200">
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
                <button className="text-[#4F46E5] text-xs font-bold hover:underline">
                  + Add New Customer
                </button>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">
                  Select Product
                </Label>
                <Select
                  value={selectedProductId}
                  onValueChange={handleProductChange}
                >
                  <SelectTrigger className="h-11 border-slate-200">
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
                  <p className="text-[11px] text-[#94A3B8] font-medium">
                    Standard Price: {formatCurrency(selectedProduct.basePrice)}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100 mt-8">
                <div className="flex items-center gap-3 border-l-4 border-[#4F46E5] pl-4 mb-8">
                  <h3 className="font-bold text-lg text-[#0F172A]">
                    Sale Terms
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">
                      Sold Price (LKR)
                    </Label>
                    <Input
                      type="number"
                      value={soldPrice}
                      onChange={(e) => setSoldPrice(Number(e.target.value))}
                      className="h-11 border-slate-200 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">
                      Down Payment (LKR)
                    </Label>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="h-11 border-slate-200 font-bold text-[#15803D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">
                      Number of Months
                    </Label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        className="w-11 h-11 border-slate-200 shrink-0"
                        onClick={() => setMonths(Math.max(1, months - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="h-11 border-slate-200 text-center font-bold"
                      />
                      <Button
                        variant="outline"
                        className="w-11 h-11 border-slate-200 shrink-0"
                        onClick={() => setMonths(months + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">
                      Sale Date
                    </Label>
                    <Input
                      type="date"
                      value={saleDate}
                      onChange={(e) => setSaleDate(e.target.value)}
                      className="h-11 border-slate-200"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Label className="text-slate-700 font-semibold">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    placeholder="Add any specific details about this sale..."
                    className="min-h-[100px] border-slate-200"
                  />
                </div>

                <Button
                  className="w-full h-14 bg-[#4F46E5] hover:bg-primary-dark mt-10 text-base font-bold shadow-xl shadow-indigo-100"
                  onClick={() => navigate("/sales")}
                >
                  Create Sale & Generate Schedule
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Side */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm sticky top-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Calculator className="w-5 h-5 text-[#4F46E5]" />
                <h3 className="font-bold text-[#0F172A]">
                  Installment Preview
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#475569]">Sold Price</span>
                  <span className="text-[#0F172A]">
                    {formatCurrency(soldPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#475569]">Down Payment</span>
                  <span className="text-[#15803D] border-b border-dashed border-green-200 pb-0.5">
                    -{formatCurrency(downPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-y border-slate-50">
                  <span className="text-sm font-bold text-[#0F172A]">
                    Remaining Balance
                  </span>
                  <span className="text-base font-black text-[#0F172A]">
                    {formatCurrency(remainingBalance)}
                  </span>
                </div>
                <div className="bg-blue-50/50 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-bold text-[#475569]">
                    Monthly Payment
                  </span>
                  <span className="text-lg font-black text-[#4F46E5]">
                    {formatCurrency(monthlyAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#475569]">Duration</span>
                  <span className="text-[#0F172A]">{months} months</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest pl-1">
                  Generated Schedule
                </h4>
                <div className="max-h-[300px] overflow-y-auto pr-1">
                  <table className="w-full text-[11px] font-medium">
                    <thead className="text-[#94A3B8] uppercase tracking-tighter sticky top-0 bg-white">
                      <tr>
                        <th className="text-left py-2 pl-2">#</th>
                        <th className="text-left py-2">Due Date</th>
                        <th className="text-right py-2 pr-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {previewSchedule.map((row) => (
                        <tr
                          key={row.num}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-2.5 pl-2 text-slate-400 font-bold">
                            {row.num}
                          </td>
                          <td className="py-2.5 text-[#475569]">
                            {formatDate(row.due)}
                          </td>
                          <td className="py-2.5 text-right pr-2 text-[#0F172A] font-bold">
                            {formatCurrency(row.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-center text-[#94A3B8] italic mt-4 bg-slate-50 py-2 rounded-lg">
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
