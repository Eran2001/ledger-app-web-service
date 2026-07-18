import * as Icon from "@/components/icons";
import * as AnimatedIcon from "@/components/icons/animated";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { icon: Icon.Globe, label: "Website", type: "lucide" },
  { icon: AnimatedIcon.InstagramIcon, label: "Instagram", type: "animated" },
  { icon: AnimatedIcon.LinkedinIcon, label: "LinkedIn", type: "animated" },
];

const ComingSoon = () => {
  return (
    <section className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="coming-soon-accent-left coming-soon-drift absolute bottom-[16%] left-[10%] h-16 w-16 xl-rounded" />
        <div className="coming-soon-accent-right coming-soon-drift-reverse absolute right-[12%] bottom-[22%] h-14 w-8 full-rounded" />

        <p className="t-section text-uppercase text-main">
          Business Verifications.
        </p>

        <h1 className="mt-4 t-coming-soon text-primary">Coming Soon</h1>

        <div className="mt-8 space-y-2">
          <p className="t-body text-soft">This page is still in progress.</p>
          <p className="t-body text-soft">
            Business verifications will be available here soon.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-4">
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
    </section>
  );
};

export default ComingSoon;
