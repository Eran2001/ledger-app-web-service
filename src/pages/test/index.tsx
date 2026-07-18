import type { ReactNode } from "react";

import * as Icon from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

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
      <Block title="button">
        <div className="flex flex-wrap items-center gap-3">
          <Button border shadow>Default</Button>
          <Button variant="success" border shadow>
            Success
          </Button>
          <Button variant="destructive" border shadow>
            Delete
          </Button>
          <Button variant="outline" shadow>
            Outline
          </Button>
          <Button variant="secondary" border shadow>
            Secondary
          </Button>
          <Button variant="ghost" border shadow>
            Ghost
          </Button>
          <Button variant="cancel" border shadow>
            Cancel
          </Button>
          <Button variant="link">Link</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" border shadow>
            Small
          </Button>
          <Button size="lg" border shadow>
            Large
          </Button>
          <Button size="xl" border shadow>
            Extra Large
          </Button>
          <Button width="full" className="max-w-64" border shadow>
            Full Width
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-sm" border shadow aria-label="Search">
            <Icon.Search />
          </Button>
          <Button size="icon" border shadow aria-label="Save">
            <Icon.Save />
          </Button>
          <Button size="icon-lg" border shadow aria-label="Send">
            <Icon.Send />
          </Button>
          <Button height="large" width="extra-large" border shadow>
            Custom Box
          </Button>
        </div>

        <div className="space-y-4">
          <ButtonGroup action="toggle" defaultValue="list" border shadow />

          <ButtonGroup
            action="split"
            border
            shadow
            items={[
              { icon: <Icon.Save />, label: "Save Invoice", onClick: () => {} },
              {
                icon: <Icon.FileText />,
                label: "Save as Draft",
                onClick: () => {},
              },
              { icon: <Icon.Send />, label: "Save & Send", onClick: () => {} },
            ]}
          />

          <ButtonGroup
            action="search"
            border
            shadow
            placeholder="Search customers..."
            onChange={() => {}}
          />

          <ButtonGroup
            action="pagination"
            border
            shadow
            label="Page 3 of 12"
            onPrev={() => {}}
            onNext={() => {}}
          />
        </div>
      </Block>

      <Block title="avatar">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar border shadow>
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
              alt="Sophie Turner"
            />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>

          <Avatar border shadow>
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>

          <Avatar border shadow>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>

          <Avatar border shadow>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </Block>

      <Block title="alert">
        <div className="space-y-4">
          <Alert border shadow>
            <AlertTitle>Default alert</AlertTitle>
            <AlertDescription>
              This alert uses the component-owned border and shadow props.
            </AlertDescription>
          </Alert>

          <Alert variant="success" border shadow>
            <AlertTitle>Success alert</AlertTitle>
            <AlertDescription>
              Avatar colors stay stable by initials, and alert styles stay
              semantic.
            </AlertDescription>
          </Alert>

          <Alert variant="warning" border shadow>
            <AlertTitle>Warning alert</AlertTitle>
            <AlertDescription>
              Use border only when you pass the prop, otherwise the alert stays
              clean.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive" border shadow>
            <AlertTitle>Destructive alert</AlertTitle>
            <AlertDescription>
              Button, button-group, avatar, and alert are now visible together
              on the test page.
            </AlertDescription>
          </Alert>
        </div>
      </Block>
    </div>
  );
}
