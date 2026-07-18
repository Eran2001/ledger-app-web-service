import type { ReactNode } from "react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

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
      <Block title="item">
        <div className="surface-card global-rounded flex max-w-xl flex-col gap-4 p-5">
          <ItemGroup>
            <Item>
              <ItemHeader>
                <ItemTitle>Revenue Overview</ItemTitle>
                <ItemActions>
                  <span className="t-label-sm text-faint">Updated 2m ago</span>
                </ItemActions>
              </ItemHeader>
              <ItemContent>
                <ItemDescription>
                  Track invoice performance, payment velocity, and top customer
                  movement from a single row.
                </ItemDescription>
              </ItemContent>
            </Item>

            <ItemSeparator />

            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Collections Queue</ItemTitle>
                <ItemDescription>
                  Review customers that need a follow-up before the next due
                  date.
                </ItemDescription>
              </ItemContent>
            </Item>

            <ItemSeparator />

            <Item variant="muted">
              <ItemContent>
                <ItemTitle>Archived Customers</ItemTitle>
                <ItemDescription>
                  Old customer records can stay visible without competing with
                  the active list.
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
      </Block>
    </div>
  );
}
