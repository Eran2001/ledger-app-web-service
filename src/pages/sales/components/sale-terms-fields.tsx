import { format } from "date-fns";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
        <Label required>Sold price</Label>
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
        <Label>Down payment</Label>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>LKR</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            type="number"
            min={0}
            value={downPayment || ""}
            onChange={(e) => onDownPaymentChange(Number(e.target.value))}
          />
        </InputGroup>
      </div>

      <div className="grid gap-2">
        <Label required>Number of months</Label>
        <ButtonGroup className="w-full">
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
        </ButtonGroup>
      </div>

      <DatePickerInput
        label="Sale date"
        value={saleDate ? new Date(saleDate) : undefined}
        onChange={(date) =>
          onSaleDateChange(date ? format(date, "yyyy-MM-dd") : "")
        }
        placeholder="Choose sale date"
        border
        shadow
      />
    </div>
  );
};
