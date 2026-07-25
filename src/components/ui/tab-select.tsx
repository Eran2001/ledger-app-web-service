import * as React from "react";

import { cn } from "@/lib/utils";

type TabItem = { value: string; label: string };

export function TabSelect({
  tabs,
  value,
  onValueChange,
  children,
}: {
  tabs: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div role="tablist" className="flex border-b-stroke border-default">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={value === t.value}
            onClick={() => onValueChange(t.value)}
            className={cn(
              "inline-flex h-field items-center px-5 t-body-md-bold tab-trigger border-b-stroke",
              value === t.value && "surface-card",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}

export function TabPanel({
  value,
  active,
  className,
  children,
}: {
  value: string;
  active: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (value !== active) return null;
  return <div className={cn("pt-6", className)}>{children}</div>;
}
