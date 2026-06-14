import { Checkbox } from "@/components/ui/checkbox";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Checkbox" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-4">
        <Checkbox />
        <Checkbox defaultChecked />
        <Checkbox disabled />
        <Checkbox defaultChecked disabled />
      </div>
    </>
  );
};

export default TestPage;
