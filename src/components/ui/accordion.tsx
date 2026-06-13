import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import * as Icon from "@/components/icons";

import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-default last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group t-meta focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 global-rounded py-4 text-left transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 cursor-pointer",
          className,
        )}
        {...props}
      >
        <span className="group-hover:underline group-hover:underline-offset-4">
          {children}
        </span>
        <Icon.ChevronDownIcon className="text-soft pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div className={cn("t-meta text-soft pt-0 pb-4", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

function AccordionTitle({ title }: { title: string }) {
  return (
    <p className="t-micro-bold text-uppercase [letter-spacing:var(--tracking-label-wide)] text-soft pb-2 border-b border-default mb-4">
      {title}
    </p>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionTitle,
};
