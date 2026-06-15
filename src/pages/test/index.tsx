import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Popover" pageSubtitle="Test" />
      <div className="p-6 flex items-start gap-6">

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <p className="t-meta fw-medium">Settings</p>
              <p className="t-caption">Manage your account preferences here.</p>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Align start</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p className="t-meta">Aligned to start.</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Align end</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <p className="t-meta">Aligned to end.</p>
          </PopoverContent>
        </Popover>

      </div>
    </>
  );
};

export default TestPage;
