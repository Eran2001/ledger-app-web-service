import { useState } from "react";

import { SidebarNav } from "@/components/shared/sidebar-nav";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <TopBar pageTitle="Sidebar Nav" pageSubtitle="Test" />
      <div className="p-6 flex gap-8">
        <div className="h-150 shrink-0 overflow-hidden border global-rounded">
          <SidebarNav
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((c) => !c)}
            showToggle
          />
        </div>
      </div>
    </>
  );
};

export default TestPage;
