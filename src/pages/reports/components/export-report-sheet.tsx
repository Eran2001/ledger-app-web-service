import { useState } from "react";
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";

import * as Icon from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SeparatorLabel } from "@/components/ui/separator-label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ReportPeriod = "day" | "week" | "month";
type ReportMode = "single" | "range";

interface QuickPresetResult {
  period: ReportPeriod;
  mode: ReportMode;
  date: string;
  endDate?: string;
}

interface QuickPreset {
  label: string;
  apply: () => QuickPresetResult;
}

const iso = (d: Date) => format(d, "yyyy-MM-dd");

const QUICK_PRESETS: QuickPreset[] = [
  {
    label: "Today",
    apply: () => ({ period: "day", mode: "single", date: iso(new Date()) }),
  },
  {
    label: "Yesterday",
    apply: () => ({
      period: "day",
      mode: "single",
      date: iso(subDays(new Date(), 1)),
    }),
  },
  {
    label: "This Week",
    apply: () => ({
      period: "week",
      mode: "range",
      date: iso(startOfWeek(new Date())),
      endDate: iso(endOfWeek(new Date())),
    }),
  },
  {
    label: "This Month",
    apply: () => ({
      period: "month",
      mode: "range",
      date: iso(startOfMonth(new Date())),
      endDate: iso(endOfMonth(new Date())),
    }),
  },
  {
    label: "Last 7 Days",
    apply: () => ({
      period: "day",
      mode: "range",
      date: iso(subDays(new Date(), 6)),
      endDate: iso(new Date()),
    }),
  },
  {
    label: "Last 30 Days",
    apply: () => ({
      period: "day",
      mode: "range",
      date: iso(subDays(new Date(), 29)),
      endDate: iso(new Date()),
    }),
  },
];

interface ExportReportSheetProps {
  open: boolean;
  onClose: () => void;
  onExport: (
    period: ReportPeriod,
    mode: ReportMode,
    date: string,
    endDate?: string,
  ) => void;
}

export const ExportReportSheet = ({
  open,
  onClose,
  onExport,
}: ExportReportSheetProps) => {
  const [period, setPeriod] = useState<ReportPeriod>("day");
  const [mode, setMode] = useState<ReportMode>("single");
  const [date, setDate] = useState(iso(new Date()));
  const [endDate, setEndDate] = useState(iso(new Date()));

  const applyPreset = (preset: QuickPreset) => {
    const next = preset.apply();
    setPeriod(next.period);
    setMode(next.mode);
    setDate(next.date);
    setEndDate(next.endDate ?? next.date);
  };

  const previewLabel =
    mode === "range"
      ? `${format(new Date(date), "MMM d, yyyy")} – ${format(new Date(endDate), "MMM d, yyyy")}`
      : format(new Date(date), "MMM d, yyyy");

  const handleExport = () => {
    onExport(period, mode, date, mode === "range" ? endDate : undefined);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent side="right" className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Export Report</SheetTitle>
          <SheetDescription>
            Choose a period to include in the PDF
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 grid gap-6">
          <div className="grid gap-3">
            <p className="t-label-sm-bold text-soft text-uppercase tracking-label">
              Quick Presets
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PRESETS.map((preset) => (
                <Badge key={preset.label} asChild variant="outline" border>
                  <button type="button" onClick={() => applyPreset(preset)}>
                    {preset.label}
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <SeparatorLabel label="or customize" />

          <div className="grid gap-3">
            <p className="t-label-sm-bold text-soft text-uppercase tracking-label">
              Period
            </p>
            <Tabs
              value={period}
              onValueChange={(v) => setPeriod(v as ReportPeriod)}
            >
              <TabsList className="w-full">
                <TabsTrigger value="day" className="flex-1">
                  Day
                </TabsTrigger>
                <TabsTrigger value="week" className="flex-1">
                  Week
                </TabsTrigger>
                <TabsTrigger value="month" className="flex-1">
                  Month
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-3">
            <p className="t-label-sm-bold text-soft text-uppercase tracking-label">
              Mode
            </p>
            <Tabs value={mode} onValueChange={(v) => setMode(v as ReportMode)}>
              <TabsList className="w-full">
                <TabsTrigger value="single" className="flex-1">
                  Single
                </TabsTrigger>
                <TabsTrigger value="range" className="flex-1">
                  Range
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {mode === "range" ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>From</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>To</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              <p className="t-label-sm-bold text-soft text-uppercase tracking-label">
                Date
              </p>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}

          <div className="surface-brand-soft global-rounded p-4 flex items-center gap-2">
            <Icon.CalendarIcon className="h-4 w-4 text-brand" />
            <p className="t-body-md text-brand">
              Exporting <span className="fw-bold">{previewLabel}</span>
            </p>
          </div>
        </div>

        <SheetFooter className="flex-row max-xs:flex-col justify-end">
          <Button
            type="button"
            variant="cancel"
            className="max-xs:order-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleExport}>
            <Icon.Download /> Export PDF
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
