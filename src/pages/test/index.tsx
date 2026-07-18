import type { ReactNode } from "react";

import { BadgeIcon } from "@/components/ui/badge-icon";

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
      <Block title="badge icon">
        <div className="flex flex-wrap items-center gap-3">
          <BadgeIcon>Default</BadgeIcon>
          <BadgeIcon variant="secondary">Secondary</BadgeIcon>
          <BadgeIcon variant="success">Success</BadgeIcon>
          <BadgeIcon variant="warning">Warning</BadgeIcon>
          <BadgeIcon variant="info" iconPosition="right">
            Info
          </BadgeIcon>
          <BadgeIcon variant="processing">Processing</BadgeIcon>
          <BadgeIcon variant="overtime">Overtime</BadgeIcon>
          <BadgeIcon variant="destructive">Destructive</BadgeIcon>
          <BadgeIcon variant="outline" iconPosition="right">
            Outline
          </BadgeIcon>
          <BadgeIcon border shadow variant="success">
            Success
          </BadgeIcon>
        </div>
      </Block>
    </div>
  );
}
