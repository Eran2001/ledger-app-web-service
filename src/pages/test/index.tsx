import { useState } from "react";
import type { Value } from "react-phone-number-input";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PhoneInput } from "@/components/ui/phone-input";
import { SearchField } from "@/components/ui/search-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabPanel, TabSelect } from "@/components/ui/tab-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimePicker } from "@/components/ui/time-picker";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Test() {
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState<Date | undefined>(
    new Date("2026-07-19"),
  );
  const [dateTimeValue, setDateTimeValue] = useState<Date | undefined>(
    new Date("2026-07-19T09:30:00"),
  );
  const [otpValue, setOtpValue] = useState("482391");
  const [inputValue, setInputValue] = useState("Acme Holdings");
  const [groupValue, setGroupValue] = useState("invoice-2048");
  const [phoneValue, setPhoneValue] = useState<Value | undefined>(
    "+94771234567",
  );
  const [selectValue, setSelectValue] = useState("pending");
  const [timeValue, setTimeValue] = useState("09:30");
  const [togglePressed, setTogglePressed] = useState(true);
  const [toggleGroupValue, setToggleGroupValue] = useState("center");
  const [activePage, setActivePage] = useState(12);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [tabSelectValue, setTabSelectValue] = useState("overview");
  const [buttonGroupSearchValue, setButtonGroupSearchValue] = useState("");
  const [buttonGroupPage, setButtonGroupPage] = useState(3);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 3xl:grid-cols-3 5xl:grid-cols-4">
        <SearchField
          value={searchValue}
          placeholder="Enter ur name"
          onChange={setSearchValue}
          onClear={() => {
            setSearchValue("");
          }}
          onSearch={() => undefined}
        />

        <Button>New Sale</Button>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="t-body-md text-faint">
              Overview tab content for the customer workspace.
            </p>
          </TabsContent>
          <TabsContent value="invoices">
            <p className="t-body-md text-faint">
              Invoice activity appears here.
            </p>
          </TabsContent>
          <TabsContent value="payments">
            <p className="t-body-md text-faint">
              Payment history appears here.
            </p>
          </TabsContent>
        </Tabs>

        <DatePickerInput
          value={dateValue}
          onChange={setDateValue}
          placeholder="Pick a due date"
        />

        <DateTimePicker value={dateTimeValue} onChange={setDateTimeValue} />

        <InitialsAvatar name="Saman Madushan" />

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>INV</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            value={groupValue}
            onChange={(event) => setGroupValue(event.target.value)}
            placeholder="Invoice code"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>
              <span className="flex items-center justify-center">
                <Icon.Search size={18} />
              </span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Customer name"
        />

        <PhoneInput value={phoneValue} onChange={setPhoneValue} />

        <Select value={selectValue} onValueChange={setSelectValue}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>

        <TimePicker value={timeValue} onChange={setTimeValue} />

        <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>
          Bold
        </Toggle>

        <ToggleGroup
          type="single"
          value={toggleGroupValue}
          onValueChange={(value) => {
            if (value) setToggleGroupValue(value);
          }}
        >
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage((current) => Math.max(1, current - 1));
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={activePage === 1}
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={activePage === 2}
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage(2);
                }}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={activePage === 3}
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage(3);
                }}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={activePage === 12}
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage(12);
                }}
              >
                12
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setActivePage((current) => Math.min(12, current + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent
                items={[
                  {
                    title: "Installments",
                    desc: "Track active customer payment plans.",
                    to: "#",
                  },
                  {
                    title: "Invoices",
                    desc: "Review invoice and due-date activity.",
                    to: "#",
                  },
                ]}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Customers</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Invoice</MenubarItem>
              <MenubarItem>Save Draft</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Export</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Rename</MenubarItem>
              <MenubarItem>Duplicate</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View invoice</DropdownMenuItem>
            <DropdownMenuItem>Edit details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Archive record</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ButtonGroup
          action="toggle"
          defaultValue="grid"
        />

        <ButtonGroup
          action="split"
          items={[
            {
              icon: <Icon.Save />,
              label: "Save Invoice",
              onClick: () => undefined,
            },
            {
              icon: <Icon.FileText />,
              label: "Save as Draft",
              onClick: () => undefined,
            },
            {
              icon: <Icon.Send />,
              label: "Save & Send",
              onClick: () => undefined,
            },
          ]}
        />

        <ButtonGroup
          action="search"
          placeholder="Search customers..."
          onChange={(event) =>
            setButtonGroupSearchValue(
              (event.target as HTMLInputElement).value,
            )
          }
        />

        <ButtonGroup
          action="pagination"
          label={`Page ${buttonGroupPage} of 12`}
          onPrev={() => setButtonGroupPage((current) => Math.max(1, current - 1))}
          onNext={() => setButtonGroupPage((current) => Math.min(12, current + 1))}
        />

        <Command border>
          <CommandInput placeholder="Search commands..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>New Invoice</CommandItem>
              <CommandItem>Customer List</CommandItem>
              <CommandItem>Export Report</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
          <CollapsibleTrigger>
            Customer summary
          </CollapsibleTrigger>
          <CollapsibleContent>
            Recent invoice totals and payment activity appear here.
          </CollapsibleContent>
        </Collapsible>

        <TabSelect
          tabs={[
            { value: "overview", label: "Overview" },
            { value: "payments", label: "Payments" },
          ]}
          value={tabSelectValue}
          onValueChange={setTabSelectValue}
        >
          <TabPanel value="overview" active={tabSelectValue}>
            <p className="t-body-md text-faint">Overview details.</p>
          </TabPanel>
          <TabPanel value="payments" active={tabSelectValue}>
            <p className="t-body-md text-faint">Payment details.</p>
          </TabPanel>
        </TabSelect>
      </div>
    </div>
  );
}
