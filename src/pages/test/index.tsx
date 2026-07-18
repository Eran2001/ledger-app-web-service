import type { ReactNode } from "react";

import { Calendar } from "@/components/ui/calendar";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="t-label-sm-bold text-faint text-uppercase tracking-label">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function Test() {
  return (
    <div className="space-y-8">
      <Block title="calendar">
        <Calendar
          mode="single"
          defaultMonth={new Date(2026, 6, 1)}
          selected={new Date(2026, 6, 18)}
          captionLayout="dropdown"
        />
      </Block>
    </div>
  );
}
