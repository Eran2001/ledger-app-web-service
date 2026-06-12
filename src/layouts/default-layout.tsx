import { Outlet } from "@tanstack/react-router";

import { Sidebar, MobileSidebar } from "@/components/shared/sidebar";
import { AppFooter } from "@/components/shared/app-footer";

export default function DefaultLayout() {
  return (
    <div className="flex min-h-screen w-full surface-page">
      <Sidebar />
      <MobileSidebar />
      <main className="flex-1 min-w-0 min-h-screen flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col">
          <Outlet />
        </div>
        <AppFooter />
      </main>
    </div>
  );
}
