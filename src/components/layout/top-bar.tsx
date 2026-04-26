import React from "react";
import { useNavigate } from "react-router-dom";
import * as Icon from "@/components/icons";
import { useAuthStore } from "@/store/auth.store";
import { useThemeStore } from "@/store/theme.store";
import { InitialsAvatar } from "../shared/initials-avatar";
import { Notification } from "@/utils/notification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  pageTitle: string;
  pageSubtitle: string;
  primaryAction?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  pageTitle,
  pageSubtitle,
  primaryAction,
}) => {
  const { user, logout } = useAuthStore();
  const { isDark, toggle } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="surface-card border-b border-border px-6 py-3 flex items-center justify-between h-16 shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="t-heading text-main">{pageTitle}</h1>
        <span className="text-faint">/</span>
        <span className="t-body text-soft">{pageSubtitle}</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-2">
          <button
            onClick={() =>
              Notification.success("Operation completed successfully.")
            }
            className="px-2 py-1 global-rounded t-caption fw-medium surface-success text-success-contrast opacity-90 hover:opacity-100 transition-opacity"
          >
            Success
          </button>
        </div>

        <button
          onClick={toggle}
          className="p-2 text-soft surface-hover circle-rounded transition-colors"
        >
          {isDark ? (
            <Icon.Sun className="w-5 h-5" />
          ) : (
            <Icon.Moon className="w-5 h-5" />
          )}
        </button>

        <button className="relative p-2 text-soft surface-hover circle-rounded transition-colors">
          <Icon.Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 notification-dot"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center ml-2 circle-rounded surface-hover transition-colors p-0.5">
              <InitialsAvatar name={user?.name || ""} size="sm" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="profile-name">{user?.name || "Unknown User"}</p>
                <p className="profile-email">{user?.email || ""}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings/profile")}>
              <Icon.User className="icon-class-global-margin" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Icon.Settings className="icon-class-global-margin" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="profile-logout">
              <Icon.LogOut className="icon-class-global-margin" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {primaryAction && <div className="ml-2">{primaryAction}</div>}
      </div>
    </header>
  );
};
