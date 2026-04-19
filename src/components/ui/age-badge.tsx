import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import getAgeColor from "@/utils/ageColor";

const AgeBadge = ({ age }: { age: number; }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span
        className="age-badge flex items-center justify-center w-6 h-6 global-rounded shrink-0 cursor-pointer"
        style={getAgeColor(age)}
      >
        {age}
      </span>
    </TooltipTrigger>
    <TooltipContent>
      {age === 0 ? "0 day due, Current" : age === 1 ? "1 day due" : `${age} days due`}
    </TooltipContent>
  </Tooltip>
);

export default AgeBadge;