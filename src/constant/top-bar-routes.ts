import * as Icon from "@/components/icons";
import type { TopBarProps } from "@/components/shared/top-bar";
import { useUIStore } from "@/stores/ui-store";
import { Notification } from "@/utils/notification";

interface RouteTopBarConfig extends TopBarProps {
  match: string | RegExp;
}

const ROUTE_TOP_BAR_CONFIGS: RouteTopBarConfig[] = [
  {
    match: "/test",
    pageTitle: "Shared Components",
    pageSubtitle: "Visual test page for shared UI components",
  },
  {
    match: "/dashboard",
    pageTitle: "Dashboard",
    pageSubtitle: "Overview of your installment business",
    primaryAction: { to: "/sales/new", icon: Icon.Plus, label: "New Sale" },
  },
  {
    match: "/sales",
    pageTitle: "Sales",
    pageSubtitle: "Manage installment sales and payment activity",
    primaryAction: { to: "/sales/new", icon: Icon.Plus, label: "New Sale" },
  },
  {
    match: "/sales/new",
    pageTitle: "New Sale",
    pageSubtitle: "Create a new installment sale",
  },
  {
    match: /^\/sales\/[^/]+$/,
    pageTitle: "Sale Details",
    pageSubtitle: "View installment schedule and payments",
  },
  {
    match: "/customers",
    pageTitle: "Customers",
    pageSubtitle: "Manage customers, profiles, and repayment history",
    primaryAction: {
      onClick: () => useUIStore.getState().openNewCustomer(),
      icon: Icon.Plus,
      label: "New Customer",
    },
  },
  {
    match: /^\/customers\/[^/]+$/,
    pageTitle: "Customer Profile",
    pageSubtitle: "Customer profile",
    primaryAction: { to: "/sales/new", icon: Icon.Plus, label: "New Sale" },
  },
  {
    match: "/products",
    pageTitle: "Products",
    pageSubtitle: "Manage your product catalog and base prices",
  },
  {
    match: "/users",
    pageTitle: "Users",
    pageSubtitle: "Manage your team members and pending access requests",
  },
  {
    match: "/overdue",
    pageTitle: "Overdue Payments",
    pageSubtitle:
      "Track and follow up on customers who have missed installment due dates",
    primaryAction: {
      onClick: () =>
        Notification.success("Reminders queued for all overdue customers"),
      icon: Icon.Send,
      label: "Send All Reminders",
    },
  },
  {
    match: "/reports",
    pageTitle: "Reports",
    pageSubtitle: "Financial performance, collections, and overdue analytics",
    primaryAction: {
      onClick: () => Notification.success("Report exported as PDF"),
      icon: Icon.Download,
      label: "Export PDF",
    },
  },
  {
    match: "/settings",
    pageTitle: "Settings",
    pageSubtitle: "Manage your business, integrations, and security",
  },
  {
    match: "/settings/profile",
    pageTitle: "Profile",
    pageSubtitle: "Update your account information",
  },
];

export function getRouteTopBarConfig(pathname: string): TopBarProps | null {
  const entry = ROUTE_TOP_BAR_CONFIGS.find(({ match }) =>
    typeof match === "string" ? pathname === match : match.test(pathname),
  );

  if (!entry) return null;

  const { match: _match, ...config } = entry;
  return config;
}
