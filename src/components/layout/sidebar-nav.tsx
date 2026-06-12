
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  PlusCircle,
  Package,
  BarChart3,
  AlertTriangle,
  UserCog,
  Settings,
  ChevronLeft,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    label: "MAIN",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/customers", label: "Customers", icon: Users },
      { href: "/sales", label: "Sales", icon: ShoppingBag },
      { href: "/sales/new", label: "New Sale", icon: PlusCircle },
      { href: "/products", label: "Products", icon: Package },
    ],
  },
  {
    label: "FINANCE",
    items: [
      { href: "/reports", label: "Reports", icon: BarChart3 },
      { href: "/overdue", label: "Overdue", icon: AlertTriangle },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { href: "/users", label: "Users", icon: UserCog },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

interface SidebarNavProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: () => void;
  showToggle?: boolean;
}

export function SidebarNav({
  collapsed,
  onToggleCollapse,
  onItemClick,
  showToggle = true,
}: SidebarNavProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const allHrefs = SECTIONS.flatMap((s) => s.items.map((i) => i.href));

  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (!pathname.startsWith(href + "/")) return false;
    return !allHrefs.some((h) => h !== href && h.startsWith(href + "/") && pathname === h);
  };

  return (
    <aside
      className={cn(
        "app-sidebar h-full min-h-0 flex flex-col transition-[width] duration-300 overflow-hidden border-r",
        collapsed ? "w-16" : "w-55",
      )}
      style={{ borderColor: "var(--sidebar-border)" }}
      aria-label="Main sidebar"
    >
      {/* Brand header */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 h-16 border-b shrink-0",
          collapsed && "justify-center px-0",
        )}
        style={{ borderColor: "var(--sidebar-border)" }}
      >
        <div className="app-sidebar-logo h-9 w-9 global-rounded flex items-center justify-center sidebar-brand-logo shrink-0">
          ST
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="sidebar-brand-name app-sidebar-text truncate">
              Silva Traders
            </span>
            <span className="sidebar-brand-sub app-sidebar-text-faint truncate">
              Admin Panel
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 min-h-0 overflow-y-auto py-4 scrollbar-hidden">
        <TooltipProvider delayDuration={0}>
          {SECTIONS.map((section, i) => (
            <div
              key={section.label}
              className={cn("mb-4", collapsed && "px-2")}
            >
              {!collapsed ? (
                <div className="px-5 mb-2 t-micro-bold app-sidebar-text-faint case-upper tracking-label-wide">
                  {section.label}
                </div>
              ) : i > 0 ? (
                <div
                  className="mb-3 border-t"
                  style={{ borderColor: "var(--sidebar-border)" }}
                />
              ) : null}
              <ul className={cn("space-y-1", !collapsed && "px-3")}>
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  if (collapsed) {
                    return (
                      <li key={item.href} className="flex justify-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={item.href}
                              onClick={onItemClick}
                              className={cn(
                                "app-sidebar-collapsed-link",
                                active && "app-sidebar-link-active",
                              )}
                            >
                              <Icon className="h-4 w-4" strokeWidth={2} />
                              <span className="sr-only">{item.label}</span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="t-meta fw-semibold px-3.5 py-2.5"
                          >
                            {item.label}
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    );
                  }
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={onItemClick}
                        className={cn(
                          "app-sidebar-link flex items-center gap-3 px-3 h-10 control-rounded t-nav transition-colors",
                          active &&
                            "app-sidebar-link-active border-l-[3px] border-start-brand pl-2.25",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </TooltipProvider>
      </nav>

      {/* User footer + collapse toggle */}
      <div
        className="border-t shrink-0 p-3"
        style={{ borderColor: "var(--sidebar-border)" }}
      >
        {!collapsed ? (
          <div className="app-sidebar-panel panel-rounded p-3 flex items-center gap-3">
            <div className="app-sidebar-avatar circle-rounded h-9 w-9 flex items-center justify-center t-caption-bold shrink-0">
              {user ? getInitials(user.name) : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="sidebar-user-name app-sidebar-text truncate">
                {user?.name}
              </p>
              <p className="sidebar-user-role app-sidebar-text-muted case-upper truncate">
                {user?.role}
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="h-8 w-8 flex items-center justify-center global-rounded app-sidebar-icon-btn"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center mb-2">
            <div className="app-sidebar-avatar circle-rounded h-9 w-9 flex items-center justify-center t-caption-bold">
              {user ? getInitials(user.name) : "U"}
            </div>
          </div>
        )}

        {showToggle && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className={cn(
              "mt-2 w-full h-9 flex items-center justify-center gap-2 control-rounded app-sidebar-link app-sidebar-icon-btn t-caption",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180",
              )}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        )}
      </div>
    </aside>
  );
}
