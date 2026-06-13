import * as Icon from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { BadgeIcon } from "@/components/ui/badge-icon";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <div className="surface-page min-h-screen">
      <TopBar
        pageTitle="Overdue Payments"
        pageSubtitle="Test"
        primaryAction={{
          to: "/customers/new",
          icon: Icon.Plus,
          label: "New Customer",
        }}
      />
      <div className="p-6">
        <h1 className="t-kpi text-main mb-4">Component Lab</h1>

        <section className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="processing">Processing</Badge>
          <Badge variant="overtime">Overtime</Badge>
          <Badge variant="sky">Sky</Badge>
        </section>

        <section className="flex flex-wrap items-center gap-3 mt-6">
          <BadgeIcon variant="success" icon={<Icon.CircleCheck />}>
            Paid
          </BadgeIcon>
          <BadgeIcon variant="warning" icon={<Icon.Clock />}>
            Partial
          </BadgeIcon>
          <BadgeIcon
            variant="destructive"
            icon={<Icon.CircleAlert />}
            iconPosition="right"
          >
            Overdue
          </BadgeIcon>
        </section>
      </div>
    </div>
  );
};

export default TestPage;
