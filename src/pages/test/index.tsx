import * as React from "react";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { TopBar } from "@/components/shared/top-bar";

const TestPage = () => {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <>
      <TopBar pageTitle="Date Picker" pageSubtitle="Test" />
      <div className="p-6 flex flex-col gap-4 max-w-sm">
        <DatePickerInput
          label="Date"
          value={date}
          onChange={setDate}
          placeholder="Select a date"
        />
        <DatePickerInput
          value={date}
          onChange={setDate}
          placeholder="No label"
        />
        <DatePickerInput
          label="Disabled"
          placeholder="Disabled"
          disabled
        />
      </div>
    </>
  );
};

export default TestPage;
