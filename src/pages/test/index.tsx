import { AppFooter } from "@/components/shared/app-footer";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="App Footer" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-8">
        <AppFooter />
      </div>
    </>
  );
};

export default TestPage;
