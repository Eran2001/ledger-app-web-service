import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Test" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6" />
    </>
  );
};

export default TestPage;
