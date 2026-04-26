import * as React from "react";
import { DayPicker } from "react-day-picker";

import * as Icon from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "ui-sm fw-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 surface-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-faint global-rounded w-9 ui-font-normal calendar-weekday-text",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 align-text-center ui-sm p-0 relative [&:has([aria-selected].day-range-end)]:corner-rounded-end-sm [&:has([aria-selected].day-outside)]:surface-accent-50 [&:has([aria-selected])]:surface-accent first:[&:has([aria-selected])]:corner-rounded-start-sm last:[&:has([aria-selected])]:corner-rounded-end-sm focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 ui-font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "surface-brand text-brand-contrast hover:surface-brand hover:text-brand-contrast focus:surface-brand focus:text-brand-contrast",
        day_today: "surface-accent text-accent-contrast",
        day_outside:
          "day-outside text-faint opacity-50 aria-selected:surface-accent-50 aria-selected:text-faint aria-selected:opacity-30",
        day_disabled: "text-faint opacity-50",
        day_range_middle:
          "aria-selected:surface-accent aria-selected:text-accent-contrast",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <Icon.ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <Icon.ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
