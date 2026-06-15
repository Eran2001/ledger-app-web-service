import { useNavigate } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

interface UserProfileProps {
  collapsed: boolean;
}

export function UserProfile({ collapsed }: UserProfileProps) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const initials = user ? getInitials(user.name) : "U";

  if (collapsed) {
    return (
      <div className="flex justify-center mb-2">
        <div className="app-sidebar-avatar global-rounded h-9 w-9 flex items-center justify-center t-caption-bold">
          {initials}
        </div>
      </div>
    );
  }

  return (
    <div className="app-sidebar-panel global-rounded p-3 flex items-center gap-3">
      <div className="app-sidebar-avatar global-rounded h-9 w-9 flex items-center justify-center t-caption-bold shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="sidebar-user-name app-sidebar-text truncate">
          {user?.name}
        </p>
        <p className="sidebar-user-role app-sidebar-text-muted text-uppercase truncate">
          {user?.role}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => {
          logout();
          navigate({ to: "/login" });
        }}
        className="app-sidebar-icon-btn"
        aria-label="Log out"
      >
        <Icon.LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
