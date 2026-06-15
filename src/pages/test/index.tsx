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
      <div className="p-6 flex flex-col gap-6">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-48"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4 t-meta">
              Panel A
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4 t-meta">
              Panel B
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        <ResizablePanelGroup
          direction="vertical"
          className="h-96"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4 t-meta">
              Top
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4 t-meta">
              Bottom
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default TestPage;
