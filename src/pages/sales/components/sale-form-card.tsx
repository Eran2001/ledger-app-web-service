import { Link } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  CardAction,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import type { Product } from "@/types/product-types";

import { CustomerProductFields } from "./customer-product-fields";
import { SaleTermsFields } from "./sale-terms-fields";

interface SaleFormCardProps {
  customerId: string;
  onCustomerChange: (id: string) => void;
  productId: string;
  onProductChange: (id: string) => void;
  product?: Product;
  soldPrice: number;
  onSoldPriceChange: (value: number) => void;
  downPayment: number;
  onDownPaymentChange: (value: number) => void;
  months: number;
  onMonthsChange: (value: number) => void;
  saleDate: string;
  onSaleDateChange: (value: string) => void;
  notes: string;
  onNotesChange: (value: string) => void;
}

export const SaleFormCard = ({
  customerId,
  onCustomerChange,
  productId,
  onProductChange,
  product,
  soldPrice,
  onSoldPriceChange,
  downPayment,
  onDownPaymentChange,
  months,
  onMonthsChange,
  saleDate,
  onSaleDateChange,
  notes,
  onNotesChange,
}: SaleFormCardProps) => {
  return (
    <Card border shadow className="gap-0">
      <CardHeader border className="px-0 pt-0">
        <CardTitle>New Sale Details</CardTitle>
        <CardDescription>
          Select the customer and product, then set the installment terms.
        </CardDescription>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="link"
                size="icon"
                className="app-sidebar-icon-btn"
              >
                <Link to="/sales">
                  <Icon.ArrowLeft />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back to sales</TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent className="py-6 grid gap-8">
        <CustomerProductFields
          customerId={customerId}
          onCustomerChange={onCustomerChange}
          productId={productId}
          onProductChange={onProductChange}
          product={product}
        />

        <div className="grid gap-4">
          <div>
            <h3 className="t-title-lg-soft text-main">Sale Terms</h3>
            <p className="t-label-md text-soft">
              Configure the sale amount, duration, and start date.
            </p>
          </div>

          <SaleTermsFields
            soldPrice={soldPrice}
            onSoldPriceChange={onSoldPriceChange}
            downPayment={downPayment}
            onDownPaymentChange={onDownPaymentChange}
            months={months}
            onMonthsChange={onMonthsChange}
            saleDate={saleDate}
            onSaleDateChange={onSaleDateChange}
          />
        </div>

        <div className="grid gap-2">
          <Label>Notes (optional)</Label>
          <Textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Reminders, contact preferences, or sale notes."
          />
        </div>

        <Button type="submit" className="w-full">
          Create Sale & Generate Schedule
        </Button>
      </CardContent>
    </Card>
  );
};
