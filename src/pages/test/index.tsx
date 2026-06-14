import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ButtonGroup } from "@/components/ui/button-group";
import { SearchField } from "@/components/ui/search-field";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  const [search, setSearch] = React.useState("");

  return (
    <>
      <TopBar pageTitle="Form Fields" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6 max-w-sm">
        <SearchField value={search} onChange={setSearch} />

        <Input placeholder="Input field" />

        <Textarea placeholder="Textarea field" />

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one">Option one</SelectItem>
            <SelectItem value="two">Option two</SelectItem>
            <SelectItem value="three">Option three</SelectItem>
          </SelectContent>
        </Select>

        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        <ButtonGroup
          action="search"
          placeholder="Search customers…"
          onChange={() => {}}
        />

        <ButtonGroup
          action="pagination"
          label="Page 3 of 12"
          onPrev={() => {}}
          onNext={() => {}}
        />
      </div>
    </>
  );
};

export default TestPage;
