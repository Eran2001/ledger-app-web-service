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

function formatDate(date?: Date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

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
              "w-full justify-between text-left gap-2 pill-rounded picker-trigger",
              "[&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:justify-between",
              "border-border/80 hover:border-foreground/60 hover:bg-accent/40",
              "data-[state=open]:border-primary data-[state=open]:bg-accent/30",
              !value && "picker-trigger-empty",
            )}
          >
            <span className="truncate">
              {value ? formatDate(value) : placeholder}
            </span>
            <Icon.CalendarIcon
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground",
                open && "text-primary",
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 card-rounded border-border/60 dropdown-shadow"
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
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
