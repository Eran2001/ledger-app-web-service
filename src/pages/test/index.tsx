import type { ReactNode } from "react";

import * as Icon from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { CardCaption } from "@/components/ui/card-caption";
import {
  Card,
  CardContent,
  CardDescription,
  CardEmpty,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <div className="space-y-8 p-6">
      <Block title="avatar">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar border shadow>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </div>
      </Block>

      <Block title="badge">
        <div className="flex items-center gap-4">
          <Badge border>Default</Badge>
          <Badge variant="success" border shadow>
            Paid
          </Badge>
          <Badge variant="warning" border shadow>
            Review
          </Badge>
        </div>
      </Block>

      <Block title="button group">
        <div className="flex flex-wrap items-center gap-4">
          <ButtonGroup action="toggle" defaultValue="list" border shadow />
          <ButtonGroup
            action="search"
            placeholder="Search invoices"
            onChange={() => undefined}
            border
            shadow
          />
          <ButtonGroup
            action="pagination"
            label="Page 2"
            onPrev={() => undefined}
            onNext={() => undefined}
            border
            shadow
          />
        </div>
      </Block>

      <Block title="button">
        <div className="flex flex-wrap items-center gap-4">
          <Button border shadow>
            <Icon.Plus />
            New Sale
          </Button>
          <Button variant="outline" shadow>
            Outline
          </Button>
          <Button variant="cancel" shadow>
            Cancel
          </Button>
        </div>
      </Block>

      <Block title="calendar">
        <Calendar
          border
          shadow
          mode="single"
          selected={new Date(2026, 6, 18)}
        />
      </Block>

      <Block title="card caption">
        <CardCaption title="Revenue Overview" border shadow>
          <div className="px-5 py-4">
            <p className="t-title-lg-soft">Quarter Summary</p>
            <p className="t-label-md text-faint">
              Border and shadow should wrap the whole caption card.
            </p>
          </div>
        </CardCaption>
      </Block>

      <Block title="card">
        <Card border shadow>
          <CardHeader border>
            <CardTitle icon={Icon.ChartColumn}>Revenue Snapshot</CardTitle>
            <CardDescription>
              Root border, header divider, and shadow should all be visible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardEmpty
              icon={Icon.ReceiptText}
              title="No outstanding invoices"
              description="Everything is settled for this period."
            />
          </CardContent>
        </Card>
      </Block>

      <Block title="carousel">
        <div className="px-12">
          <Carousel border shadow>
            <CarouselContent>
              <CarouselItem>
                <div className="px-6 py-5">
                  <p className="t-title-lg-soft">Revenue Overview</p>
                  <p className="t-label-md text-faint">
                    Border and shadow should be visible on the carousel shell.
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="px-6 py-5">
                  <p className="t-title-lg-soft">Invoice Velocity</p>
                  <p className="t-label-md text-faint">
                    Use this slide to confirm the border survives class merging.
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Block>
    </div>
  );
}
