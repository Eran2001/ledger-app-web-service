import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Label" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6 max-w-sm">

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="disabled" className="opacity-50">Disabled label</Label>
          <Input id="disabled" disabled placeholder="Disabled input" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>

      </div>
    </>
  );
};

export default TestPage;
