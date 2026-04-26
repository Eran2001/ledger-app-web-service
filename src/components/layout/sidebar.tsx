import React from "react";
import * as Icon from "@/components/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { InitialsAvatar } from "../shared/initials-avatar";

const SidebarItem: React.FC<{
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
}> = ({ to, icon: Icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 global-rounded cursor-pointer transition-all t-nav",
        isActive
          ? "app-sidebar-link-active backdrop-blur border-l-[3px] border-sidebar-primary pl-2.25"
          : "app-sidebar-link",
      )
    }
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </NavLink>
);

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-55 app-sidebar flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className="sidebar-brand-logo w-10 h-10 global-rounded app-sidebar-logo flex items-center justify-center shrink-0">
          ST
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="sidebar-brand-name app-sidebar-text truncate">Silva Traders</span>
          <span className="sidebar-brand-sub app-sidebar-text-muted truncate">Admin Panel</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-hidden p-3 space-y-1">
        <div className="label-caps-wide app-sidebar-text-faint px-3 py-2 mt-2">
          Main
        </div>
        <SidebarItem to="/dashboard" icon={Icon.LayoutDashboard} label="Dashboard" />
        <SidebarItem to="/customers" icon={Icon.Users} label="Customers" />
        <SidebarItem to="/sales" icon={Icon.ShoppingBag} label="Sales" end />
        <SidebarItem to="/sales/new" icon={Icon.PlusCircle} label="New Sale" />
        <SidebarItem to="/products" icon={Icon.Package} label="Products" />

        <div className="label-caps-wide app-sidebar-text-faint px-3 py-2 mt-4">
          Finance
        </div>
        <SidebarItem to="/reports" icon={Icon.BarChart3} label="Reports" />
        <SidebarItem to="/overdue" icon={Icon.AlertTriangle} label="Overdue" />

        <div className="label-caps-wide app-sidebar-text-faint px-3 py-2 mt-4">
          System
        </div>
        <SidebarItem to="/users" icon={Icon.UserCog} label="Users" />
        <SidebarItem to="/buttons" icon={Icon.MousePointerClick} label="Buttons" />
        <SidebarItem to="/settings" icon={Icon.Settings} label="Settings" />
      </nav>

      <div className="p-3 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 p-2 global-rounded app-sidebar-panel">
          <InitialsAvatar name={user?.name || ""} size="sm" />
          <div className="flex flex-col min-w-0 pr-2">
            <span className="sidebar-user-name app-sidebar-text truncate">
              {user?.name}
            </span>
            <span className="sidebar-user-role app-sidebar-text-muted truncate">
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto app-sidebar-text-dim app-sidebar-text-hover transition-colors"
          >
            <Icon.LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
