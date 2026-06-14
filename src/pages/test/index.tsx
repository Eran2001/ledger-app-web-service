import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Drawer" pageSubtitle="Test" />
      <div className="p-6 flex gap-4">
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button>Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent className="w-200 max-sm:w-full">
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>
                This is the drawer description. It provides more context about
                the action.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="global-rounded border p-4">
                  <p className="t-meta fw-semibold">Item {i + 1}</p>
                  <p className="t-caption">
                    This is some sample content for row {i + 1} to demonstrate
                    the scrollable middle area of the drawer.
                  </p>
                </div>
              ))}
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="cancel">Cancel</Button>
              </DrawerClose>
              <Button>Confirm</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default TestPage;
