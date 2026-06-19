import type { ComponentType } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/shared/initials-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUIStore } from "@/stores/ui-store";
import { useThemeStore } from "@/stores/theme-store";
import { useAuthStore } from "@/stores/auth-store";

interface PrimaryAction {
  to?: string;
  onClick?: () => void;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

interface TopBarProps {
  pageTitle: string;
  pageSubtitle?: string;
  primaryAction?: PrimaryAction;
}

export function TopBar({
  pageTitle,
  pageSubtitle,
  primaryAction,
}: TopBarProps) {
  const setMobileOpen = useUIStore((s) => s.setMobileSidebarOpen);
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <header className="surface-card border-b border-default h-16 shrink-0 px-4 sm:px-6 flex items-center gap-3 sticky top-0 z-topbar">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden app-sidebar-link app-sidebar-icon-btn"
        aria-label="Open menu"
      >
        <Icon.Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-baseline gap-2 min-w-0 flex-1">
        <h1 className="t-heading text-main truncate">{pageTitle}</h1>
        {pageSubtitle && (
          <>
            <span className="text-faint t-body hidden sm:inline">/</span>
            <span className="t-body text-soft truncate hidden sm:inline">
              {pageSubtitle}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {primaryAction && (
          <div className="ml-1 hidden sm:block">
            {primaryAction.to ? (
              <Button
                type="button"
                onClick={() => navigate({ to: primaryAction.to })}
              >
                <primaryAction.icon />
                {primaryAction.label}
              </Button>
            ) : (
              <Button type="button" onClick={primaryAction.onClick}>
                <primaryAction.icon />
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="app-sidebar-link app-sidebar-icon-btn"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Icon.Sun className="h-5 w-5" />
          ) : (
            <Icon.Moon className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative app-sidebar-link app-sidebar-icon-btn"
          aria-label="Notifications"
        >
          <Icon.Bell className="h-5 w-5" />
          <span className="notification-dot absolute top-1.5 right-1.5 h-2.5 w-2.5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InitialsAvatar name={user?.name ?? "User"} size="md" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-60 surface-popover border border-default modal-rounded"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="t-meta-bold text-main">{user?.name}</span>
                <span className="t-caption text-soft">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to="/settings/profile"
                className="flex items-center gap-2 t-meta"
              >
                <Icon.User className="h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2 t-meta">
                <Icon.Settings className="h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                logout();
                navigate({ to: "/login" });
              }}
              className="flex items-center gap-2 t-meta"
            >
              <Icon.LogOut className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
