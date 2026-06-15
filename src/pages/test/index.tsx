import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Radio Group" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6 max-w-sm">

        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="r1" />
            <Label htmlFor="r1">Option 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="r2" />
            <Label htmlFor="r2">Option 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-3" id="r3" disabled />
            <Label htmlFor="r3">Option 3 (disabled)</Label>
          </div>
        </RadioGroup>

      </div>
    </>
  );
};

export default TestPage;
