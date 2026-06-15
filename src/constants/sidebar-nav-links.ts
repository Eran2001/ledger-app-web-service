import { type LucideIcon } from "lucide-react";

import * as Icon from "@/components/icons";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

export const SECTIONS: NavSection[] = [
  {
    label: "MAIN",
    items: [
      { href: "/test", label: "Test", icon: Icon.FlaskConical },
      { href: "/dashboard", label: "Dashboard", icon: Icon.LayoutDashboard },
      { href: "/customers", label: "Customers", icon: Icon.Users },
      { href: "/sales", label: "Sales", icon: Icon.ShoppingBag },
      { href: "/sales/new", label: "New Sale", icon: Icon.PlusCircle },
      { href: "/products", label: "Products", icon: Icon.Package },
    ],
  },
  {
    label: "FINANCE",
    items: [
      { href: "/reports", label: "Reports", icon: Icon.BarChart3 },
      { href: "/overdue", label: "Overdue", icon: Icon.AlertTriangle },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { href: "/users", label: "Users", icon: Icon.UserCog },
      { href: "/settings", label: "Settings", icon: Icon.Settings },
    ],
  },
];
