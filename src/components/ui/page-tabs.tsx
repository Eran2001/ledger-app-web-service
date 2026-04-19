import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageTab {
  label: string;
  value: string;
}

interface PageTabsProps {
  tabs: PageTab[];
  value: string;
  onValueChange: (value: string) => void;
}

const PageTabs = ({ tabs, value, onValueChange }: PageTabsProps) => {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default PageTabs;