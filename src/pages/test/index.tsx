import { Separator } from "@/components/ui/separator";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Separator" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6 max-w-sm">

        <div className="flex flex-col gap-2">
          <p className="t-meta">Above</p>
          <Separator />
          <p className="t-meta">Below</p>
        </div>

        <div className="flex items-center gap-4 h-8">
          <p className="t-meta">Left</p>
          <Separator orientation="vertical" />
          <p className="t-meta">Middle</p>
          <Separator orientation="vertical" />
          <p className="t-meta">Right</p>
        </div>

      </div>
    </>
  );
};

export default TestPage;
