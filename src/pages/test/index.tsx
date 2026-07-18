import type { ReactNode } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="t-label-sm-bold text-faint text-uppercase tracking-label">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function Test() {
  return (
    <div className="space-y-8">
      <Block title="aspect ratio">
        <AspectRatio ratio={1 / 1}>
          <div className="flex h-full items-center justify-center t-title-md text-brand">
            16:9
          </div>
        </AspectRatio>
      </Block>
    </div>
  );
}
