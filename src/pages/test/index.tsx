import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

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
      <Block title="badge">
        <div className="flex flex-wrap items-center gap-3">
          <Badge border shadow>
            Default
          </Badge>
          <Badge variant="secondary" border shadow>
            Secondary
          </Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning" border shadow>
            Warning
          </Badge>
          <Badge variant="info" border shadow>
            Info
          </Badge>
          <Badge variant="processing" border shadow>
            Processing
          </Badge>
          <Badge variant="overtime" border shadow>
            Overtime
          </Badge>
          <Badge variant="destructive" border shadow>
            Destructive
          </Badge>
          <Badge variant="outline" border shadow>
            Outline
          </Badge>
        </div>
      </Block>
    </div>
  );
}
