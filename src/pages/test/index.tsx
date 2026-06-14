import { ButtonGroup } from "@/components/ui/button-group";
import { TopBar } from "@/components/shared/top-bar";
import * as Icon from "@/components/icons";

const TestPage = () => {
  return (
    <>
      <TopBar
        pageTitle="Button Group"
        pageSubtitle="Test"
        primaryAction={{
          to: "/customers/new",
          icon: Icon.Plus,
          label: "New Customer",
        }}
      />
      <div className="p-6 flex flex-col gap-8">
        <section className="flex flex-col gap-2">
          <ButtonGroup action="toggle" defaultValue="list" />
        </section>

        <section className="flex flex-col gap-2">
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
        </section>

        <section className="flex flex-col gap-2">
          <ButtonGroup
            action="search"
            placeholder="Search customers…"
            onChange={() => {}}
          />
        </section>

        <section className="flex flex-col gap-2">
          <ButtonGroup
            action="pagination"
            label="Page 3 of 12"
            onPrev={() => {}}
            onNext={() => {}}
          />
        </section>
      </div>
    </>
  );
};

export default TestPage;
