import { StatusBadge } from "@/components/shared/status-badge";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  return (
    <>
      <TopBar pageTitle="Status Badge" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          <StatusBadge status="PAID" />
          <StatusBadge status="PARTIALLY_PAID" />
          <StatusBadge status="OVERDUE" />
          <StatusBadge status="PENDING" />
          <StatusBadge status="ACTIVE" />
          <StatusBadge status="COMPLETED" />
          <StatusBadge status="WRITTEN_OFF" />
        </div>
      </div>
    </>
  );
};

export default TestPage;
