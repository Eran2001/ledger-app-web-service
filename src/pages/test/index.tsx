import type { ReactNode } from "react";
import { useState } from "react";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

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
  const [value, setValue] = useState("daily");

  return (
    <div className="space-y-8">
      <Block title="radio group">
        <div className="surface-card global-rounded flex max-w-xl flex-col gap-5 p-5">
          <RadioGroup value={value} onValueChange={setValue}>
            <RadioGroupItem
              value="daily"
              label="Daily reminders"
            />
            <RadioGroupItem
              value="weekly"
              label="Weekly summaries"
            />
            <RadioGroupItem
              value="monthly"
              label="Monthly statements"
            />
          </RadioGroup>
        </div>
      </Block>
    </div>
  );
}
