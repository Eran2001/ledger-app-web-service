import * as Icon from "@/components/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Input Group" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6 max-w-md">

        <InputGroup>
          <InputGroupAddon>
            <Icon.Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="yoursite.com" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Go</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup size="compact">
          <InputGroupAddon>
            <Icon.Mail />
          </InputGroupAddon>
          <InputGroupInput placeholder="Email address" />
        </InputGroup>

        <InputGroup size="large">
          <InputGroupAddon>
            <Icon.DollarSign />
          </InputGroupAddon>
          <InputGroupInput placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon align="block-start">
            <InputGroupText>Message</InputGroupText>
          </InputGroupAddon>
          <InputGroupTextarea placeholder="Type your message..." />
        </InputGroup>

      </div>
    </>
  );
};

export default TestPage;
