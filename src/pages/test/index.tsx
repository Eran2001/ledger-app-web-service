import type { ReactNode } from "react";

import * as Icon from "@/components/icons";
import { AppFooter } from "@/components/shared/app-footer";
import { BusinessHeader } from "@/components/shared/business-header";
import { CardCaption } from "@/components/shared/card-caption";
import { CategoryLabel } from "@/components/shared/category-label";
import { CategoryPill } from "@/components/shared/category-pill";
import ComingSoon from "@/components/shared/coming-soon";
import { EmptyState } from "@/components/shared/empty-state";
import { Fallback } from "@/components/ui/fallback";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import { SyncedHeightPair } from "@/components/shared/synced-height-pair";
import { SidebarNav } from "@/components/shared/sidebar-nav";
import { StatPill } from "@/components/shared/stat-pill";
import { StatusBadge } from "@/components/shared/status-badge";
import { TopBar } from "@/components/shared/top-bar";
import { UserProfile } from "@/components/shared/user-profile";
import type { ProductCategory } from "@/types/product-types";

const CATEGORIES: ProductCategory[] = [
  "Electronics",
  "Appliances",
  "Furniture",
  "Hardware",
  "Other",
];

const STAT_PILL_COLORS = [
  "indigo",
  "amber",
  "gray",
  "green",
  "red",
  "teal",
  "purple",
] as const;

const STATUS_VALUES = [
  "PAID",
  "PARTIALLY_PAID",
  "OVERDUE",
  "PENDING",
  "ACTIVE",
  "COMPLETED",
  "WRITTEN_OFF",
] as const;

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="t-micro-bold text-faint text-uppercase tracking-label">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function Test() {
  return (
    <div className="space-y-8">
      <Block title="InitialsAvatar">
        <div className="flex flex-wrap items-end gap-4">
          <InitialsAvatar name="Silva Traders" size="sm" />
          <InitialsAvatar name="Silva Traders" size="md" />
          <InitialsAvatar name="Silva Traders" size="lg" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <SyncedHeightPair
            left={<InitialsAvatar name="Silva Traders" size="auto" />}
            right={
              <div className="min-w-0">
                <p className="t-meta-bold text-main">Auto Small</p>
                <p className="t-caption text-soft">Single line content</p>
              </div>
            }
            squareLeft
            className="gap-3"
          />
          <div className="rounded-xl border border-default p-4">
            <SyncedHeightPair
              left={<InitialsAvatar name="Silva Traders" size="auto" />}
              right={
                <div className="min-w-0 space-y-1">
                  <p className="t-meta-bold text-main">Auto Medium</p>
                  <p className="t-caption text-soft">
                    Two lines of content to test how the avatar inherits height
                    from the right side block.
                  </p>
                </div>
              }
              squareLeft
              className="gap-3"
            />
          </div>
          <div className="rounded-xl border border-default p-4">
            <SyncedHeightPair
              left={<InitialsAvatar name="Silva Traders" size="auto" />}
              right={
                <div className="min-w-0 space-y-2">
                  <p className="t-meta-bold text-main">Auto Large</p>
                  <p className="t-caption text-soft">
                    This example has more vertical content.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="ACTIVE" />
                    <CategoryPill category="Electronics" />
                  </div>
                </div>
              }
              squareLeft
              className="gap-3"
            />
          </div>
        </div>
      </Block>

      <Block title="BusinessHeader">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="app-sidebar border border-default overflow-hidden rounded-xl">
            <BusinessHeader collapsed={false} />
          </div>
          <div className="app-sidebar border border-default overflow-hidden rounded-xl">
            <BusinessHeader collapsed />
          </div>
        </div>
      </Block>

      <Block title="UserProfile">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="app-sidebar border border-default p-4 rounded-xl">
            <UserProfile collapsed={false} />
          </div>
          <div className="app-sidebar border border-default p-4 rounded-xl flex justify-center">
            <UserProfile collapsed />
          </div>
        </div>
      </Block>

      <Block title="CategoryLabel">
        <div className="flex flex-wrap gap-4">
          {CATEGORIES.map((category) => (
            <CategoryLabel key={category} category={category} />
          ))}
        </div>
      </Block>

      <Block title="CategoryPill">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <CategoryPill key={category} category={category} />
          ))}
        </div>
      </Block>

      <Block title="StatPill">
        <div className="flex flex-wrap gap-3">
          {STAT_PILL_COLORS.map((color) => (
            <StatPill key={color} label={color} color={color} />
          ))}
        </div>
      </Block>

      <Block title="StatusBadge">
        <div className="flex flex-wrap gap-3">
          {STATUS_VALUES.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
      </Block>

      <Block title="CardCaption">
        <CardCaption
          title="Card Caption"
          actionLabel="Reports"
          actionTo="/reports"
        >
          <div className="p-4">Card content</div>
        </CardCaption>
      </Block>

      <Block title="TopBar">
        <div className="surface-card border border-default overflow-hidden rounded-xl">
          <TopBar
            pageTitle="Top Bar"
            pageSubtitle="Preview"
            primaryAction={{
              to: "/sales/new",
              icon: Icon.Plus,
              label: "New Sale",
            }}
          />
        </div>
      </Block>

      <Block title="SidebarNav">
        <div className="grid gap-4 xl:grid-cols-[4rem_minmax(0,1fr)]">
          <div className="h-136 overflow-hidden rounded-xl border border-default">
            <SidebarNav collapsed onToggleCollapse={() => undefined} />
          </div>
          <div className="h-136 overflow-hidden rounded-xl border border-default">
            <SidebarNav collapsed={false} onToggleCollapse={() => undefined} />
          </div>
        </div>
      </Block>

      <Block title="EmptyState">
        <EmptyState
          icon={Icon.Package}
          title="No products"
          subtitle="Nothing here yet."
          actionLabel="Create"
          actionIcon={Icon.Plus}
          onAction={() => undefined}
        />
      </Block>

      <Block title="ComingSoon">
        <div className="h-112 overflow-hidden rounded-xl border border-default">
          <ComingSoon />
        </div>
      </Block>

      <Block title="AppFooter">
        <div className="overflow-hidden rounded-xl border border-default">
          <AppFooter />
        </div>
      </Block>
    </div>
  );
}
