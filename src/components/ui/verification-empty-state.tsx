import * as Icon from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";

interface VerificationEmptyStateProps {
  title: string;
  description: string;
}

export function VerificationEmptyState({
  title,
  description,
}: VerificationEmptyStateProps) {
  return (
    <Card border className="flex-1 min-h-70 justify-center">
      <CardContent className="space-y-4 text-center">
        <div className="mx-auto flex h-medium-large w-medium-large items-center justify-center global-rounded border-stroke border-default">
          <Icon.FlaskConical className="icon-large text-brand" />
        </div>
        <div className="space-y-2">
          <p className="t-title-xl text-main">{title}</p>
          <p className="t-body-md text-faint">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
