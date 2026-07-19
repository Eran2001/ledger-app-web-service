import { Link, useLocation } from "@tanstack/react-router";

import { BusinessHeader } from "@/components/shared/business-header";
import { UserProfile } from "@/components/shared/user-profile";

import * as Icon from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { SECTIONS } from "@/constant/sidebar-nav-links";

interface SidebarNavProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: () => void;
  showToggle?: boolean;
  className?: string;
}

export function SidebarNav({
  collapsed,
  onToggleCollapse,
  onItemClick,
  showToggle = true,
  className,
}: SidebarNavProps) {
  const { pathname } = useLocation();

  const allHrefs = SECTIONS.flatMap((s) => s.items.map((i) => i.href));

  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (!pathname.startsWith(href + "/")) return false;
    return !allHrefs.some(
      (h) => h !== href && h.startsWith(href + "/") && pathname === h,
    );
  };

  return (
    <aside
      className={cn(
        "app-sidebar border-r-stroke h-full min-h-0 flex flex-col transition-[width] duration-300 overflow-hidden",
        collapsed ? "w-16" : "w-55",
        className,
      )}
      style={{
        borderColor:
          "color-mix(in srgb, var(--sidebar-border) 55%, var(--border-transparent))",
      }}
      aria-label="Main sidebar"
    >
      <BusinessHeader collapsed={collapsed} />

      <nav className="flex-1 min-h-0 overflow-y-auto pt-4 scrollbar-hidden">
        <TooltipProvider delayDuration={0}>
          {SECTIONS.map((section, i) => (
            <div
              key={section.label}
              className={cn("mb-4", collapsed && "px-2")}
            >
              {!collapsed ? (
                <div className="px-5 mb-2 t-label-sm-bold app-sidebar-text-faint text-uppercase">
                  {section.label}
                </div>
              ) : i > 0 ? (
                <div
                  className="mb-3 border-t-stroke"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--sidebar-border) 55%, var(--border-transparent))",
                  }}
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
                                "app-sidebar-link app-sidebar-icon-btn inline-flex h-field w-field items-center justify-center global-rounded",
                              )}
                              style={
                                active
                                  ? {
                                      backgroundColor: "var(--primary-light)",
                                      color: "var(--primary)",
                                    }
                                  : undefined
                              }
                            >
                              <Icon className="h-4 w-4" strokeWidth={2} />
                              <span className="sr-only">{item.label}</span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="t-body-md fw-semibold px-3.5 py-2.5"
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
                          "app-sidebar-link flex items-center gap-3 px-3 h-10 global-rounded t-body-md transition-colors",
                        )}
                        style={
                          active
                            ? {
                                backgroundColor: "var(--primary-light)",
                                color: "var(--primary)",
                              }
                            : undefined
                        }
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

      <div
        className="border-t-stroke shrink-0 p-3"
        style={{
          borderColor:
            "color-mix(in srgb, var(--sidebar-border) 55%, var(--border-transparent))",
        }}
      >
        <UserProfile collapsed={collapsed} />

        {showToggle && onToggleCollapse && (
          <Button
            variant="ghost"
            onClick={onToggleCollapse}
            className="mt-2 w-full app-sidebar-link app-sidebar-icon-btn t-label-md"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon.ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180",
              )}
            />
            {!collapsed && <span>Collapse</span>}
          </Button>
        )}
      </div>
    </aside>
  );
}
