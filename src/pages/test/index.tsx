import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Switch" pageSubtitle="Test" />
      <div className="p-6">
        <Card className="p-6 flex flex-col gap-4 max-w-sm">

          <div className="flex items-center gap-2">
            <Switch id="s1" />
            <Label htmlFor="s1">Default (off)</Label>
          </div>

          <div className="flex items-center gap-2">
            <Switch id="s2" defaultChecked />
            <Label htmlFor="s2">Default (on)</Label>
          </div>

          <div className="flex items-center gap-2">
            <Switch id="s3" disabled />
            <Label htmlFor="s3">Disabled (off)</Label>
          </div>

          <div className="flex items-center gap-2">
            <Switch id="s4" disabled defaultChecked />
            <Label htmlFor="s4">Disabled (on)</Label>
          </div>

        </Card>
      </div>
    </>
  );
};

export default TestPage;
