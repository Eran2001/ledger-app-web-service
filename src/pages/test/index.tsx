import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Hover Card" pageSubtitle="Test" />
      <div className="p-6 flex gap-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col gap-2">
              <p className="t-meta fw-semibold">John Doe</p>
              <p className="t-caption">
                Full-stack developer. Joined January 2023.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  );
};

export default TestPage;
