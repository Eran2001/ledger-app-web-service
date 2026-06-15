import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Resizable" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-8">

        <ResizablePanelGroup direction="horizontal" className="h-48">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4">
              <span className="t-meta">Left panel</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4">
              <span className="t-meta">Right panel</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        <ResizablePanelGroup direction="vertical" className="h-64">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4">
              <span className="t-meta">Top panel</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4">
              <span className="t-meta">Bottom panel</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

      </div>
    </>
  );
};

export default TestPage;
