import * as React from "react";

import * as Icon from "@/components/icons";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type DatePickerInputProps = {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const formatDate = (date?: Date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export function DatePickerInput({
  label,
  value,
  onChange,
  placeholder = "Select date",
  disabled,
  className,
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            data-state={open ? "open" : "closed"}
            className={cn(
              "w-full justify-between text-left gap-2",
              "[&>span]:flex [&>span]:w-full",
              "[&>span]:items-center [&>span]:justify-between",
              "h-field",
              "t-body-md picker-trigger",
              !value && "picker-trigger-empty",
            )}
          >
            <span className="truncate">
              {value ? formatDate(value) : placeholder}
            </span>
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
              <Icon.CalendarIcon />
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "w-auto p-0",
            "dropdown-shadow picker-content",
          )}
          align="start"
          sideOffset={6}
        >
          <Calendar
            mode="single"
            selected={value}
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
