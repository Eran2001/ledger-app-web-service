import type { ReactNode } from "react";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

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
      <Block title="empty">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon.FileText />
            </EmptyMedia>
            <EmptyTitle>No invoices yet</EmptyTitle>
            <EmptyDescription>
              Create your first invoice to start tracking payments, due dates,
              and customer balances.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>New invoice</Button>
          </EmptyContent>
        </Empty>
      </Block>
    </div>
  );
}
