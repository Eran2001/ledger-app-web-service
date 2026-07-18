import type { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useWidth } from "@/hooks/use-width";
import { getResponsiveBreakpoint } from "@/utils/get-responsive-size";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="t-label-sm-bold text-faint text-uppercase tracking-label">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function Test() {
  const { width, breakpoints } = useWidth();
  const activeBreakpoint = getResponsiveBreakpoint(width, breakpoints);

  return (
    <div className="space-y-8">
      <Block title="accordion">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What changed in accordion?</AccordionTrigger>
            <AccordionContent>
              Accordion item borders now use semantic responsive border-width
              utilities instead of fixed Tailwind `border-b`.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What helper should I use now?</AccordionTrigger>
            <AccordionContent>
              Keep `getResponsiveSize` for the existing four semantic sizes. Use
              `getResponsiveBreakpoint` when you need exact breakpoint-aware
              width, height, or border behavior.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Does this cover all breakpoints?
            </AccordionTrigger>
            <AccordionContent>
              Yes. The exact helper now covers `base`, `xxs`, `xs`, `sm`, `md`,
              `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `8xl`,
              `9xl`, and `10xl`.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Block>
    </div>
  );
}
