import * as React from "react";
import { useState } from "react";

import * as Icon from "@/components/icons";
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

import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: string; // "HH:mm" 24h
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const HOURS = Array.from({ length: 12 }, (_, i) => {
  const h = i + 1;
  return { label: String(h).padStart(2, "0"), value: h };
});

const MINUTES = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, "0"),
  value: i,
}));

function to12h(value: string): {
  hour: number;
  minute: number;
  period: "AM" | "PM";
} {
  const [hStr, mStr] = (value || "00:00").split(":");
  const h24 = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  return {
    hour: h24 % 12 === 0 ? 12 : h24 % 12,
    minute,
    period: h24 < 12 ? "AM" : "PM",
  };
}

function to24h(hour: number, minute: number, period: "AM" | "PM"): string {
  let h24 = hour % 12;
  if (period === "PM") h24 += 12;
  return `${String(h24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatDisplay(
  hour: number,
  minute: number,
  period: "AM" | "PM",
): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

export function TimePicker({
  value,
  onChange,
  className,
  disabled,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const { hour, minute, period } = to12h(value ?? "00:00");

  const handleHour = (v: string) =>
    onChange(to24h(parseInt(v, 10), minute, period));
  const handleMinute = (v: string) =>
    onChange(to24h(hour, parseInt(v, 10), period));
  const handlePeriod = (v: string) =>
    onChange(to24h(hour, minute, v as "AM" | "PM"));

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          data-state={open ? "open" : "closed"}
          className={cn(
            "flex items-center justify-between w-full h-10 px-3 gap-2",
            "pill-rounded border bg-background cursor-pointer outline-none picker-trigger",
            "border-border/60 hover:bg-accent/20",
            "data-[state=open]:border-primary data-[state=open]:bg-accent/30",
            "transition-colors duration-150",
            disabled && "opacity-50 pointer-events-none",
            !value && "picker-trigger-empty",
            className,
          )}
        >
          <span className="truncate tabular-nums">
            {formatDisplay(hour, minute, period)}
          </span>
          <Icon.Clock
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-150",
              open && "text-primary",
            )}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-3 card-rounded border-border/60 dropdown-shadow"
        align="start"
        sideOffset={6}
      >
        <div className="flex items-center gap-1.5">
          <Select value={String(hour)} onValueChange={handleHour}>
            <SelectTrigger className="w-16 h-10 tabular-nums">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {HOURS.map(({ label, value: v }) => (
                <SelectItem key={v} value={String(v)} className="tabular-nums">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="picker-separator text-muted-foreground">:</span>

          <Select value={String(minute)} onValueChange={handleMinute}>
            <SelectTrigger className="w-16 h-10 tabular-nums">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {MINUTES.map(({ label, value: v }) => (
                <SelectItem key={v} value={String(v)} className="tabular-nums">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={handlePeriod}>
            <SelectTrigger className="w-20 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
