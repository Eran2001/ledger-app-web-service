import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { TopBar } from "@/components/shared/top-bar";
import * as Icon from "@/components/icons";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Kbd" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6">

        <div className="flex items-center gap-3">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Esc</Kbd>
        </div>

        <div className="flex items-center gap-3">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </div>

        <div className="flex items-center gap-3">
          <Kbd><Icon.ChevronUp className="size-3" /></Kbd>
          <Kbd><Icon.ChevronDown className="size-3" /></Kbd>
          <Kbd><Icon.ChevronLeft className="size-3" /></Kbd>
          <Kbd><Icon.ChevronRight className="size-3" /></Kbd>
        </div>

      </div>
    </>
  );
};

export default TestPage;
