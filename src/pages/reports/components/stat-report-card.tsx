import type { ElementType, ReactNode } from "react";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

type StatReportCardColor = "brand" | "success" | "warning" | "info";

const COLOR_CLASSES: Record<StatReportCardColor, string> = {
  brand: "surface-brand-soft text-brand",
  success: "surface-success-soft text-success-role",
  warning: "surface-warning-soft text-warning-role",
  info: "surface-info-soft text-info-role",
};

interface StatReportCardProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
  tooltip: string;
  icon: ElementType;
  iconColor?: StatReportCardColor;
  border?: boolean;
  shadow?: boolean;
}

export const StatReportCard = ({
  label,
  value,
  valueClassName,
  tooltip,
  icon: Icon,
  iconColor = "brand",
  border = false,
  shadow = false,
}: StatReportCardProps) => {
  return (
    <Card
      border={border}
      shadow={shadow}
      className="flex-row items-center justify-between gap-4"
    >
      <div className="min-w-0">
        <p className="t-label-sm-bold text-soft text-uppercase">{label}</p>
        <p className={cn("t-display-xl mt-2", valueClassName ?? "text-main")}>
          {value}
        </p>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "global-rounded flex h-medium-large w-medium-large shrink-0 items-center justify-center",
              COLOR_CLASSES[iconColor],
              "cursor-pointer",
            )}
          >
            <Icon className="icon-large" />
          </div>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </Card>
  );
};
