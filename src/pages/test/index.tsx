import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Navigation Menu" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent
                items={[
                  {
                    title: "Introduction",
                    desc: "Overview of how it all works.",
                    to: "#",
                  },
                  {
                    title: "Installation",
                    desc: "How to install and set up.",
                    to: "#",
                  },
                  {
                    title: "Quickstart",
                    desc: "Get up and running fast.",
                    to: "#",
                  },
                ]}
              />
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent
                items={[
                  {
                    title: "Button",
                    desc: "Clickable action element.",
                    to: "#",
                  },
                  { title: "Input", desc: "Text input field.", to: "#" },
                  {
                    title: "Dialog",
                    desc: "Modal overlay component.",
                    to: "#",
                  },
                ]}
              />
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="px-4 py-2">
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};

export default TestPage;
