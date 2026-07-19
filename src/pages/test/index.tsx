import * as Icon from "@/components/icons";
import { EmptyState } from "@/components/shared/empty-state";

const Test = () => {
  return (
    <div className="space-y-6">
      <EmptyState
        icon={Icon.AlertCircle}
        title="Hello"
        subtitle="yes"
        actionLabel="Click"
        onAction={() => undefined}
        actionIcon={Icon.AlertCircle}
      />
    </div>
  );
};

export default Test;
