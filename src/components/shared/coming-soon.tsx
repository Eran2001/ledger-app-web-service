import * as Icon from "@/components/icons";
import * as AnimatedIcon from "@/components/icons/animated";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const SOCIALS = [
  { icon: Icon.Globe, label: "Website", type: "lucide" },
  { icon: AnimatedIcon.InstagramIcon, label: "Instagram", type: "animated" },
  { icon: AnimatedIcon.LinkedinIcon, label: "LinkedIn", type: "animated" },
];

const ComingSoon = () => {
  return (
    <section
      className={cn(
        "relative flex min-h-full w-full flex-1 overflow-hidden",
        "items-center justify-center px-6 py-12",
      )}
    >
      <div
        className={cn(
          "coming-soon-accent-left coming-soon-drift absolute",
          "left-[10%] top-[20%] h-16 w-16 xl-rounded",
        )}
      />
      <div
        className={cn(
          "coming-soon-accent-right coming-soon-drift-reverse absolute",
          "right-[12%] top-[18%] h-14 w-8 full-rounded",
        )}
      />

      <div
        className={cn(
          "absolute top-1/2 left-1/2 z-1 flex w-full max-w-5xl",
          "-translate-x-1/2 -translate-y-1/2 flex-col items-center px-6",
          "text-center",
        )}
      >
        <p className="t-title-xl text-uppercase text-main">
          Business Verifications.
        </p>

        <h1 className="mt-4 t-display-max text-primary">Coming Soon</h1>

        <div className="mt-8 space-y-2">
          <p className="t-body-lg text-soft">This page is still in progress.</p>
          <p className="t-body-lg text-soft">
            Business verifications will be available here soon.
          </p>
        </div>

        <div className={cn("mt-10 flex items-center justify-center gap-4")}>
          {SOCIALS.map(({ icon: SocialIcon, label, type }) => (
            <Button
              key={label}
              type="button"
              aria-label={label}
              variant="outline"
              size="icon-lg"
            >
              {type === "lucide" ? (
                <SocialIcon className="size-5" />
              ) : (
                <SocialIcon size={20} className="text-current" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
