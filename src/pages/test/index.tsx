import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import * as Icon from "@/components/icons";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Item" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6 max-w-lg">

        <ItemGroup>
          <Item>
            <ItemMedia variant="icon">
              <Icon.User />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>John Doe</ItemTitle>
              <ItemDescription>john@example.com</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="ghost">Edit</Button>
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemMedia variant="icon">
              <Icon.Settings />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Settings</ItemTitle>
              <ItemDescription>Manage your account preferences and notifications.</ItemDescription>
            </ItemContent>
          </Item>
          <ItemSeparator />
          <Item variant="muted" size="sm">
            <ItemContent>
              <ItemTitle>Compact muted item</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="outline">View</Button>
            </ItemActions>
          </Item>
        </ItemGroup>

        <Item variant="outline">
          <ItemMedia variant="image">
            <img src="https://placehold.co/40x40" alt="placeholder" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Image item</ItemTitle>
            <ItemDescription>Item with image media variant.</ItemDescription>
          </ItemContent>
        </Item>

      </div>
    </>
  );
};

export default TestPage;
