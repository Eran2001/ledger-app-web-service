import { Link } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { CardCaptionProps } from "@/types/dashboard";

export function CardCaption({
  title,
  actionLabel,
  actionTo,
  className,
  children,
}: CardCaptionProps) {
  return (
    <Card className={cn("p-0 gap-0 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-5 h-extra-large border-b border-default">
        <span className="t-display">{title}</span>
        {actionLabel && actionTo && (
          <Button variant="link" size="sm" className="p-0">
            <Link to={actionTo} className="inline-flex items-center gap-1">
              {actionLabel} <Icon.ArrowRight className="icon-compact" />
            </Link>
          </Button>
        )}
      </div>
      {children}
    </Card>
  );
}
