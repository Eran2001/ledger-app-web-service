import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTitle,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TestPage = () => {
  return (
    <div className="p-8 surface-page min-h-screen">
      <h1 className="t-kpi text-main mb-8">Component Lab</h1>

      {/* Accordion */}
      <section>
        <AccordionTitle title="Accordion" />
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="1">
            <AccordionTrigger>What is an installment plan?</AccordionTrigger>
            <AccordionContent>
              A fixed payment schedule spread over a defined period.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>
              How are overdue payments handled?
            </AccordionTrigger>
            <AccordionContent>
              Overdue installments are flagged and tracked in the overdue
              section.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTrigger>
              Can I edit a sale after creation?
            </AccordionTrigger>
            <AccordionContent>
              Yes, sales can be edited as long as they are not fully paid or
              written off.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default TestPage;
