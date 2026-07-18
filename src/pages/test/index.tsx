import type { ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <Block title="avatar">
        <div className="flex items-center gap-4">
          <Avatar border shadow>
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80"
              alt="Sophia Turner"
            />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>

          <Avatar border shadow>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>

          <Avatar border shadow>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <Avatar border shadow>
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
      </Block>
    </div>
  );
}
