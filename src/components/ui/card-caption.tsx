import { Link } from "@tanstack/react-router";

import * as Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { CardCaptionProps } from "@/types/dashboard-types";

export function CardCaption({
  title,
  actionLabel,
  actionTo,
  className,
  border = false,
  shadow = false,
  children,
}: CardCaptionProps) {
  return (
    <Card
      border={border}
      shadow={shadow}
      className={cn("p-0 gap-0", className)}
    >
      <div className="global-rounded overflow-hidden">
        <div
          className={cn(
            "flex h-extra-large items-center justify-between px-5",
            border && "border-b-stroke border-default",
          )}
        >
          <span className="t-title-lg-soft">{title}</span>
          {actionLabel && actionTo && (
            <Button variant="link" className="p-0">
              <Link
                to={actionTo}
                className="group inline-flex items-center gap-2 text-brand btn-base btn-link"
              >
                {actionLabel}
                <Icon.ArrowRight className="icon-default icon-front-hover" />
              </Link>
            </Button>
          )}
        </div>
        {children}
      </div>
    </Card>
  );
}
