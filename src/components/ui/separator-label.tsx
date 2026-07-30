import * as React from "react";

import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

function SeparatorLabel({
  label,
  orientation = "horizontal",
  className,
}: {
  label: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const isVertical = orientation === "vertical";

  return (
    <div
      data-slot="separator-label"
      className={cn(
        "flex items-center gap-3",
        isVertical ? "h-full flex-col" : "w-full flex-row",
        className,
      )}
    >
      <Separator orientation={orientation} className="flex-1" />
      <span className="t-label-md text-faint whitespace-nowrap">{label}</span>
      <Separator orientation={orientation} className="flex-1" />
    </div>
  );
}

export { SeparatorLabel };
