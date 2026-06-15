import * as React from "react";
import { format } from "date-fns";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { TimePicker } from "@/components/ui/time-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  minDate?: Date;
  size?: "default" | "compact" | "large";
  className?: string;
  error?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  minDate,
  size = "default",
  className,
  error,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const timeValue = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(
        value.getMinutes(),
      ).padStart(2, "0")}`
    : "00:00";

  const handleTimeChange = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const next = value ? new Date(value) : new Date();
    next.setHours(hours, minutes);
    onChange?.(next);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const next = new Date(date);
    if (value) {
      next.setHours(value.getHours(), value.getMinutes());
    }
    onChange?.(next);
    setOpen(false);
  };

  return (
    <div className={cn("flex gap-3", className)}>
      <div className="flex-1 space-y-1.5">
        <Label className="datetime-field-label">Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              data-state={open ? "open" : "closed"}
              className={cn(
                "w-full justify-between gap-2",
                size === "compact" ? "h-compact" : size === "large" ? "h-large" : "h-field",
                "[&>span]:flex [&>span]:w-full",
                "[&>span]:items-center [&>span]:justify-between",
                "t-meta global-rounded picker-trigger",
                !value && "picker-trigger-empty",
                error && "form-validation",
              )}
            >
              <span className="truncate">
                {value ? format(value, "dd MMM yyyy") : "Select date"}
              </span>
              <Icon.ChevronDown className="h-4 w-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 global-rounded dropdown-shadow picker-content"
            align="start"
            sideOffset={6}
          >
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

      <div className="w-32 space-y-1.5">
        <Label className="datetime-field-label">Time</Label>
        <TimePicker
          value={timeValue}
          onChange={handleTimeChange}
          size={size}
        />
      </div>
    </div>
  );
}
