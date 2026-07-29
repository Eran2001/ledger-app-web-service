import { Link } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { customers } from "@/constant/customer-data";
import { products } from "@/constant/product-data";
import { useUIStore } from "@/stores/ui-store";
import { formatCurrency } from "@/utils/format-currency";
import type { Product } from "@/types/product-types";

import { NewCustomer } from "@/pages/customer/components/new-customer";

interface CustomerProductFieldsProps {
  customerId: string;
  onCustomerChange: (id: string) => void;
  productId: string;
  onProductChange: (id: string) => void;
  product?: Product;
}

export const CustomerProductFields = ({
  customerId,
  onCustomerChange,
  productId,
  onProductChange,
  product,
}: CustomerProductFieldsProps) => {
  const openNewCustomer = useUIStore((s) => s.openNewCustomer);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid gap-3">
        <Label required>Select customer</Label>
        <Select value={customerId} onValueChange={onCustomerChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a customer…" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.fullName} · {c.primary_phone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="link"
          className="w-fit p-0"
          onClick={openNewCustomer}
        >
          <Icon.UserPlus />
          Add New Customer
        </Button>
        <NewCustomer />
      </div>

      <div className="grid gap-3">
        <Label required>Select product</Label>
        <Select value={productId} onValueChange={onProductChange}>
          <SelectTrigger className="w-full">
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="link" className="w-fit p-0">
            <Icon.ShoppingCart />
            Add New Product
          </Button>
          {/* {product && (
            <p className="t-label-md text-soft">
              Standard price:{" "}
              <span className="fw-bold text-main">
                {formatCurrency(product.basePrice)}
              </span>
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};
