import { format } from "date-fns";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

interface SaleTermsFieldsProps {
  soldPrice: number;
  onSoldPriceChange: (value: number) => void;
  downPayment: number;
  onDownPaymentChange: (value: number) => void;
  months: number;
  onMonthsChange: (value: number) => void;
  saleDate: string;
  onSaleDateChange: (value: string) => void;
}

export const SaleTermsFields = ({
  soldPrice,
  onSoldPriceChange,
  downPayment,
  onDownPaymentChange,
  months,
  onMonthsChange,
  saleDate,
  onSaleDateChange,
}: SaleTermsFieldsProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="grid gap-2">
        <Label required className="text-main">
          Sold price
        </Label>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>LKR</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            type="number"
            min={0}
            value={soldPrice || ""}
            onChange={(e) => onSoldPriceChange(Number(e.target.value))}
          />
        </InputGroup>
      </div>

      <div className="grid gap-2">
        <Label className="text-main">Down payment</Label>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>LKR</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            type="number"
            min={0}
            value={downPayment || ""}
            onChange={(e) => onDownPaymentChange(Number(e.target.value))}
            className="text-success-role"
          />
        </InputGroup>
      </div>

      <div className="grid gap-2">
        <Label required className="text-main">
          Number of months
        </Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => onMonthsChange(Math.max(1, months - 1))}
            variant="outline"
            size="icon"
          >
            <Icon.Minus />
          </Button>
          <Input
            type="number"
            min={1}
            value={months}
            onChange={(e) =>
              onMonthsChange(Math.max(1, Number(e.target.value)))
            }
            className="text-center"
          />
          <Button
            type="button"
            onClick={() => onMonthsChange(months + 1)}
            variant="outline"
            size="icon"
          >
            <Icon.Plus />
          </Button>
        </div>
      </div>

      <DatePickerInput
        label="Sale date"
        value={saleDate ? new Date(saleDate) : undefined}
        onChange={(date) =>
          onSaleDateChange(date ? format(date, "yyyy-MM-dd") : "")
        }
        placeholder="Choose sale date"
      />
    </div>
  );
};
