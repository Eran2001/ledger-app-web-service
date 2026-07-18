import type { ReactNode } from "react";

import * as Icon from "@/components/icons";
import { ButtonGroup } from "@/components/ui/button-group";

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
      <Block title="button group">
        <div className="space-y-4">
          <ButtonGroup action="toggle" defaultValue="list" border shadow />

          <ButtonGroup
            action="split"
            border
            shadow
            items={[
              { icon: <Icon.Save />, label: "Save Invoice", onClick: () => {} },
              {
                icon: <Icon.FileText />,
                label: "Save as Draft",
                onClick: () => {},
              },
              { icon: <Icon.Send />, label: "Save & Send", onClick: () => {} },
            ]}
          />

          <ButtonGroup
            action="search"
            border
            shadow
            placeholder="Search customers..."
            onChange={() => {}}
          />

          <ButtonGroup
            action="pagination"
            border
            shadow
            label="Page 3 of 12"
            onPrev={() => {}}
            onNext={() => {}}
          />
        </div>
      </Block>
    </div>
  );
}
