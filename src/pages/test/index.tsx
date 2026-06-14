import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Card" pageSubtitle="Test" />
      <div className="p-6 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here.</p>
          </CardContent>
          <CardFooter>
            <p>Card footer</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default TestPage;
