import * as React from "react";
import { cn } from "@/lib/utils";

type ToggleOption = {
  label: string;
  value: string;
};

interface ToggleTabsProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  maxWidth?: string;
}

export function ToggleTabs({
  options,
  value,
  onChange,
  className,
  maxWidth = "max-w-75", // 300px
}: ToggleTabsProps) {
  const activeIndex = options.findIndex((o) => o.value === value);

  return (
    <div
      className={cn(
        "toggle-tabs-container w-full",
        maxWidth,
        className
      )}
    >
      <div
        className="toggle-tabs-indicator"
        style={{
          width: `calc((100% - 12px) / ${options.length})`,
          transform: `translateX(calc(${activeIndex} * (100% + ${8 / options.length}px)))`,
        }}
      />

      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "toggle-tabs-button",
            value === option.value && "toggle-tabs-button-active"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}