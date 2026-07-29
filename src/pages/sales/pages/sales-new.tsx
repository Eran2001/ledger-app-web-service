import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { addMonths, format } from "date-fns";

import { Notification } from "@/components/ui/custom-toast";

import { products } from "@/constant/product-data";

import { InstallmentPreviewCard } from "../components/installment-preview-card";
import { SaleFormCard } from "../components/sale-form-card";

const SalesNew = () => {
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

  const handleProductChange = (id: string) => {
    setProductId(id);
    const p = products.find((x) => x.id === id);
    if (p) setSoldPrice(p.basePrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !productId || soldPrice <= 0) {
      Notification.error("Please fill all required fields.");
      return;
    }
    Notification.success("Sale created and schedule generated.");
    setTimeout(() => navigate({ to: "/sales" }), 600);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <SaleFormCard
            customerId={customerId}
            onCustomerChange={setCustomerId}
            productId={productId}
            onProductChange={handleProductChange}
            product={product}
            soldPrice={soldPrice}
            onSoldPriceChange={setSoldPrice}
            downPayment={downPayment}
            onDownPaymentChange={setDownPayment}
            months={months}
            onMonthsChange={setMonths}
            saleDate={saleDate}
            onSaleDateChange={setSaleDate}
            notes={notes}
            onNotesChange={setNotes}
          />
        </div>

        <div className="xl:col-span-2">
          <InstallmentPreviewCard
            soldPrice={soldPrice}
            downPayment={downPayment}
            remaining={remaining}
            monthly={monthly}
            months={months}
            schedule={schedule}
          />
        </div>
      </form>
    </div>
  );
};

export default SalesNew;
