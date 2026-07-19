import type { ComponentType } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { NotificationDot } from "@/components/ui/notification-dot";
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

export interface PrimaryAction {
  to?: string;
  onClick?: () => void;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

export interface TopBarProps {
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
    <header className="surface-background h-14 shrink-0 px-4 sm:px-6 flex items-center gap-3 sticky top-0 z-topbar">
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
        <h1 className="t-title-lg-soft text-main truncate">{pageTitle}</h1>
        {pageSubtitle && (
          <>
            <span className="text-faint t-body-lg hidden sm:inline">/</span>
            <span className="t-body-lg text-soft truncate hidden sm:inline">
              {pageSubtitle}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {primaryAction && (
          <div className="ml-1">
            <Button
              type="button"
              size="icon"
              className="sm:hidden"
              onClick={
                primaryAction.to
                  ? () => navigate({ to: primaryAction.to })
                  : primaryAction.onClick
              }
              aria-label={primaryAction.label}
            >
              <primaryAction.icon />
            </Button>
            <Button
              type="button"
              className="hidden sm:flex"
              onClick={
                primaryAction.to
                  ? () => navigate({ to: primaryAction.to })
                  : primaryAction.onClick
              }
            >
              <primaryAction.icon />
              {primaryAction.label}
            </Button>
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
          <NotificationDot />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InitialsAvatar name={user?.name ?? "User"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60" border shadow>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="t-body-md-bold text-main">{user?.name}</span>
                <span className="t-label-md text-soft">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to="/settings/profile"
                className="flex items-center gap-2 t-body-md"
              >
                <Icon.User className="h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/settings"
                className="flex items-center gap-2 t-body-md"
              >
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
              className="flex items-center gap-2 t-body-md"
            >
              <Icon.LogOut className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
