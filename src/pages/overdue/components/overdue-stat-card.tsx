import type { ElementType, ReactNode } from "react";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

type OverdueStatCardColor = "danger" | "warning";

const COLOR_CLASSES: Record<OverdueStatCardColor, string> = {
  danger: "surface-danger-soft text-danger",
  warning: "surface-warning-soft text-warning-role",
};

interface OverdueStatCardProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
  tooltip: string;
  icon: ElementType;
  iconColor?: OverdueStatCardColor;
  border?: boolean;
  shadow?: boolean;
}

export const OverdueStatCard = ({
  label,
  value,
  valueClassName,
  tooltip,
  icon: Icon,
  iconColor = "danger",
  border = false,
  shadow = false,
}: OverdueStatCardProps) => {
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
