import * as React from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <>
      <TopBar pageTitle="Date Time Picker" pageSubtitle="Test" />
      <div className="p-6 max-w-md">
        <DateTimePicker value={date} onChange={setDate} />
      </div>
    </>
  );
};

export default TestPage;
