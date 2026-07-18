import type { ReactNode } from "react";

import { CategoryPill } from "@/components/ui/category-pill";

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
      <Block title="category pill">
        <div className="surface-card global-rounded flex flex-wrap items-center gap-4 p-5">
          <CategoryPill category="Electronics" shadow />
          <CategoryPill category="Appliances" border shadow />
          <CategoryPill category="Furniture" border shadow />
          <CategoryPill category="Hardware" border shadow />
          <CategoryPill category="Other" border shadow />
        </div>
      </Block>
    </div>
  );
}
