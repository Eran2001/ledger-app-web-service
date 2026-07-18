import type { ReactNode } from "react";

import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="space-y-8 p-6">
      <Block title="checkbox">
        <div className="surface-card global-rounded space-y-4 p-5">
          <Checkbox label="Default checkbox" />
          <Checkbox
            label="With description"
            description="This row helps verify label spacing and description styling."
          />
          <Checkbox
            defaultChecked
            label="Checked state"
            description="Confirm checked background, border, and icon sizing."
          />
          <Checkbox disabled label="Disabled state" />
        </div>
      </Block>
    </div>
  );
}
