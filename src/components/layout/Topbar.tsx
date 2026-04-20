import React from "react";
import * as Icon from "@/components/icons";
import { useAuthStore } from "@/store/auth.store";
import { useThemeStore } from "@/store/theme.store";
import { InitialsAvatar } from "../shared/InitialsAvatar";

interface TopbarProps {
  pageTitle: string;
  pageSubtitle: string;
  primaryAction?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({
  pageTitle,
  pageSubtitle,
  primaryAction,
}) => {
  const { user } = useAuthStore();
  const { isDark, toggle } = useThemeStore();

  return (
    <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between h-16 shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="t-heading text-heading">{pageTitle}</h1>
        <span className="text-hint">/</span>
        <span className="t-body text-body">{pageSubtitle}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="p-2 text-body hover:bg-surface rounded-full transition-colors"
        >
          {isDark ? (
            <Icon.Sun className="w-5 h-5" />
          ) : (
            <Icon.Moon className="w-5 h-5" />
          )}
        </button>

        <button className="relative p-2 text-body hover:bg-surface rounded-full transition-colors">
          <Icon.Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
        </button>

        <div className="flex items-center gap-3 ml-2">
          <InitialsAvatar name={user?.name || ""} size="sm" />
        </div>

        {primaryAction && <div className="ml-2">{primaryAction}</div>}
      </div>
    </header>
  );
};
