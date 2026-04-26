import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Icon from "@/components/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DurationUnit = "hours" | "days" | "weeks";

export interface DurationValue {
  amount: number;
  unit: DurationUnit;
}

interface DurationPickerProps {
  value: DurationValue;
  onChange: (value: DurationValue) => void;
  className?: string;
  disabled?: boolean;
  min?: number;
}

const UNITS: { label: string; value: DurationUnit }[] = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
];

function formatDisplay(amount: number, unit: DurationUnit): string {
  const label = UNITS.find((u) => u.value === unit)?.label ?? unit;
  return `${amount} ${amount === 1 ? label.slice(0, -1) : label}`; // "1 Hour" vs "2 Hours"
}

export function DurationPicker({ value, onChange, className, disabled, min = 1 }: DurationPickerProps) {
  const [open, setOpen] = useState(false);
  const safe: DurationValue = value ?? { amount: 1, unit: "hours" };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (isNaN(parsed)) return;
    onChange({ ...safe, amount: Math.max(min, parsed) });
  };

  const handleUnit = (unit: string) => {
    onChange({ ...safe, unit: unit as DurationUnit });
  };

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          className={cn(
            "flex items-center justify-between w-full px-3 h-12 global-rounded border border-input surface-base ui-sm cursor-pointer",
            disabled && "opacity-50 pointer-events-none",
            className
          )}
        >
          <span>{formatDisplay(safe.amount, safe.unit)}</span>
          <Icon.Timer className="h-4 w-4 text-faint" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex items-center gap-3">
          <Input
            type="number"
            min={min}
            value={safe.amount}
            onChange={handleAmount}
            className="w-20 h-10"
          />
          <Select value={safe.unit} onValueChange={handleUnit}>
            <SelectTrigger className="w-25 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNITS.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}