import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  List,
  LayoutGrid,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const buttonGroupVariants = cva(
  [
    "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative",
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
    "has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md",
    "has-[>[data-slot=button-group]]:gap-2",
  ].join(" "),
  {
    variants: {
      orientation: {
        horizontal: "btn-group-h",
        vertical: "flex-col btn-group-v",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

type ButtonGroupContextValue = {
  activeValue: string;
  setActiveValue: (value: string) => void;
};

const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(
  null,
);

type SplitItem = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

type ButtonGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants> &
  (
    | {
        action: "toggle";
        defaultValue?: string;
        items?: never;
        label?: never;
        onClick?: never;
      }
    | {
        action: "split";
        items: [SplitItem, ...SplitItem[]];
        defaultValue?: never;
        label?: never;
        onClick?: never;
      }
    | {
        action: "search";
        placeholder: string;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        items?: never;
        defaultValue?: never;
        label?: never;
        onClick?: never;
      }
    | {
        action: "pagination";
        label: string;
        onPrev: () => void;
        onNext: () => void;
        items?: never;
        defaultValue?: never;
        onClick?: never;
      }
    | {
        action?: never;
        defaultValue?: never;
        items?: never;
        label?: never;
        onClick?: never;
      }
  );

function ButtonGroup({
  className,
  orientation,
  action,
  defaultValue = "",
  items,
  label,
  onClick,
  placeholder,
  onChange,
  onPrev,
  onNext,
  ...props
}: ButtonGroupProps & {
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [activeValue, setActiveValue] = React.useState(defaultValue);

  if (action === "toggle") {
    return (
      <ButtonGroupContext.Provider value={{ activeValue, setActiveValue }}>
        <div
          role="group"
          data-slot="button-group"
          data-orientation={orientation}
          className={cn(buttonGroupVariants({ orientation }), className)}
          {...props}
        >
          <ButtonGroupItem value="list">
            <List />
          </ButtonGroupItem>
          <ButtonGroupItem value="grid">
            <LayoutGrid />
          </ButtonGroupItem>
        </div>
      </ButtonGroupContext.Provider>
    );
  }

  if (action === "split" && items) {
    const [primary, ...rest] = items;
    return (
      <div
        role="group"
        data-slot="button-group"
        className={cn(buttonGroupVariants({ orientation }), className)}
        {...props}
      >
        <Button onClick={primary.onClick}>
          {primary.icon}
          {primary.label}
        </Button>
        <Separator
          orientation="vertical"
          className="surface-input relative m-0! self-stretch data-[orientation=vertical]:h-auto"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {rest.map((item) => (
              <DropdownMenuItem key={item.label} onClick={item.onClick}>
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (action === "search") {
    return (
      <div
        role="group"
        data-slot="button-group"
        className={cn(
          buttonGroupVariants({ orientation }),
          "btn-group-search",
          className,
        )}
        {...props}
      >
        <ButtonGroupText>
          <Search />
        </ButtonGroupText>
        <Input placeholder={placeholder} onChange={onChange} />
      </div>
    );
  }

  if (action === "pagination") {
    return (
      <div
        role="group"
        data-slot="button-group"
        className={cn(buttonGroupVariants({ orientation }), className)}
        {...props}
      >
        <Button variant="outline" size="icon" onClick={onPrev}>
          <ChevronLeft />
        </Button>
        <ButtonGroupText>{label}</ButtonGroupText>
        <Button variant="outline" size="icon" onClick={onNext}>
          <ChevronRight />
        </Button>
      </div>
    );
  }

  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupItem({
  className,
  value,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { value: string }) {
  const ctx = React.useContext(ButtonGroupContext);
  const isActive = ctx?.activeValue === value;

  return (
    <button
      type="button"
      data-slot="button-group-item"
      data-active={isActive}
      className={cn(
        "btn-group-toggle-item",
        "inline-flex items-center justify-center size-9 cursor-pointer",
        "[&>svg]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      onClick={(e) => {
        ctx?.setActiveValue(value);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "surface-muted global-rounded t-meta border flex items-center gap-2 px-4 shadow-card-hover",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "surface-input relative m-0! self-stretch data-[orientation=vertical]:h-auto",
        className,
      )}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupItem,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};

/*

TOGGLE
<ButtonGroup action="toggle" defaultValue="list" />


DROPDOWN
<ButtonGroup
            action="split"
            items={[
              { icon: <Icon.Save />, label: "Save Invoice", onClick: () => {} },
              {
                icon: <Icon.FileText />,
                label: "Save as Draft",
                onClick: () => {},
              },
              { icon: <Icon.Send />, label: "Save & Send", onClick: () => {} },
            ]}
          />


SEARCH
<ButtonGroup
            action="search"
            placeholder="Search customers…"
            onChange={() => {}}
          />

PAGINATION
<ButtonGroup
            action="pagination"
            label="Page 3 of 12"
            onPrev={() => {}}
            onNext={() => {}}
          />

*/
