import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Dialog" pageSubtitle="Test" />
      <div className="p-6 flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is the dialog description. It provides more context about
                the action.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button variant="cancel">Cancel</Button>
              </DialogTrigger>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TestPage;
