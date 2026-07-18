import { Outlet, useLocation } from "@tanstack/react-router";

import { Sidebar, MobileSidebar } from "@/components/shared/sidebar";
import { AppFooter } from "@/components/shared/app-footer";
import { TopBar, type TopBarProps } from "@/components/shared/top-bar";
import { getRouteTopBarConfig } from "@/constant/top-bar-routes";
import { useTopBarStore } from "@/stores/top-bar-store";

export default function DefaultLayout() {
  const { pathname } = useLocation();
  const override = useTopBarStore((state) => state.override);
  const routeTopBar = getRouteTopBarConfig(pathname);
  const overrideConfig =
    override?.pathname === pathname ? override.config : null;
  const resolvedTopBar =
    routeTopBar || overrideConfig?.pageTitle
      ? ({
          ...(routeTopBar ?? {}),
          ...(overrideConfig ?? {}),
        } as TopBarProps)
      : null;

  return (
    <div className="flex min-h-screen w-full surface-page">
      <Sidebar />
      <MobileSidebar />
      <main className="flex-1 min-w-0 min-h-screen flex flex-col">
        {resolvedTopBar ? <TopBar {...resolvedTopBar} /> : null}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="flex min-h-full flex-col p-6">
            <Outlet />
          </div>
        </div>
        <AppFooter />
      </main>
    </div>
  );
}
