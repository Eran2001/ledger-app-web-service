import * as React from "react";
import { format } from "date-fns";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  minDate?: Date;
  className?: string;
  error?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  minDate,
  className,
  error,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const timeValue = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`
    : "00:00";

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const next = value ? new Date(value) : new Date();
    next.setHours(hours, minutes);
    onChange?.(next);
  };

  const handleDateSelect = (date) => {
    const next = new Date(date);
    if (value) {
      next.setHours(value.getHours(), value.getMinutes());
    }
    onChange?.(next);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <div className="flex-1 space-y-1">
        <Label className="ui-xs text-faint">Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full justify-between ui-font-normal form-input",
                !value && "text-faint",
                error && "form-validation"
              )}
            >
              {value ? format(value, "dd MMM yyyy") : "Select date"}
              <Icon.ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              defaultMonth={value}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={minDate ? (date) => date < minDate : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-32 space-y-1">
        <Label className="ui-xs text-faint">Time</Label>
        <Input
          type="time"
          value={timeValue}
          onChange={handleTimeChange}
          className={cn(
            "form-input appearance-none [&::-webkit-calendar-picker-indicator]:hidden",
            error && "form-validation"
          )}
        />
      </div>
    </div>
  );
}