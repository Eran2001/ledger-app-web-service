import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/shared/top-bar";
import * as Icon from "@/components/icons";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Empty" pageSubtitle="Test" />
      <div className="p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon.Box />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              There are no items to display yet. Try adjusting your filters or{" "}
              <a href="#">create a new one</a>.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Create New</Button>
          </EmptyContent>
        </Empty>
      </div>
    </>
  );
};

export default TestPage;
