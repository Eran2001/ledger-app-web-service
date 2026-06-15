import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { TopBar } from "@/components/shared/top-bar";
import * as Icon from "@/components/icons";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Input Group" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-4 max-w-sm">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Icon.Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="yoursite.com" />
        </InputGroup>

        <InputGroup>
          <InputGroupInput placeholder="Amount" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  );
};

export default TestPage;
