import React, { useState } from "react";
import {
  Plus,
  ArrowRight,
  Download,
  Trash2,
  Send,
  Settings,
  ChevronRight,
  Mail,
} from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";

const BtnRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-wrap items-center gap-3">
    <span className="t-micro fw-bold text-faint case-upper tracking-label-wide w-28 shrink-0">
      {label}
    </span>
    {children}
  </div>
);

export const ButtonsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const triggerLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  };

  return (
    <div className="flex flex-col h-full surface-page">
      <TopBar
        pageTitle="Button Reference"
        pageSubtitle="All variants · sizes · states · icons"
      />

      <div className="p-6 overflow-y-auto">
        <div className="surface-card card-rounded border border-border shadow-sm p-8">
          <div className="space-y-8">
            {/* Variants */}
            <div>
              <p className="t-micro-bold text-faint case-upper tracking-label-wide mb-4 pb-2 border-b border-border">
                Variants
              </p>
              <BtnRow label="Default">
                <Button>Default</Button>
              </BtnRow>
              <div className="mt-3">
                <BtnRow label="Success">
                  <Button variant="success">Success</Button>
                </BtnRow>
              </div>
              <div className="mt-3">
                <BtnRow label="Destructive">
                  <Button variant="destructive">Destructive</Button>
                </BtnRow>
              </div>
              <div className="mt-3">
                <BtnRow label="Outline">
                  <Button variant="outline">Outline</Button>
                </BtnRow>
              </div>
              <div className="mt-3">
                <BtnRow label="Secondary">
                  <Button variant="secondary">Secondary</Button>
                </BtnRow>
              </div>
              <div className="mt-3">
                <BtnRow label="Ghost">
                  <Button variant="ghost">Ghost</Button>
                </BtnRow>
              </div>
              <div className="mt-3">
                <BtnRow label="Link">
                  <Button variant="link">Link</Button>
                </BtnRow>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="t-micro-bold text-faint case-upper tracking-label-wide mb-4 pb-2 border-b border-border">
                Sizes
              </p>
              <BtnRow label="Small">
                <Button size="sm">Small</Button>
                <Button size="sm" variant="outline">
                  Small Outline
                </Button>
              </BtnRow>
              <div className="mt-3">
                <BtnRow label="Default">
                  <Button size="default">Default</Button>
                  <Button size="default" variant="outline">
                    Default Outline
                  </Button>
                </BtnRow>
              </div>
              <div className="mt-3">
                <BtnRow label="Large">
                  <Button size="lg">Large</Button>
                  <Button size="lg" variant="outline">
                    Large Outline
                  </Button>
                </BtnRow>
              </div>
              <div className="mt-3">
                <BtnRow label="Icon">
                  <Button size="icon">
                    <Settings />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Download />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Trash2 />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2 />
                  </Button>
                </BtnRow>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <p className="t-micro-bold text-faint case-upper tracking-label-wide mb-4 pb-2 border-b border-border">
                With Icons
              </p>
              <BtnRow label="Leading icon">
                <Button>
                  <Plus /> New Sale
                </Button>
                <Button variant="outline">
                  <Download /> Export
                </Button>
                <Button variant="secondary">
                  <Mail /> Send Email
                </Button>
              </BtnRow>
              <div className="mt-3">
                <BtnRow label="Trailing icon">
                  <Button>
                    Continue <ChevronRight />
                  </Button>
                  <Button variant="outline">
                    View All <ArrowRight />
                  </Button>
                </BtnRow>
              </div>
              <div className="mt-3">
                <BtnRow label="Both icons">
                  <Button>
                    <Send /> Send <ChevronRight />
                  </Button>
                  <Button variant="destructive">
                    <Trash2 /> Delete <ChevronRight />
                  </Button>
                </BtnRow>
              </div>
            </div>

            {/* Loading */}
            <div>
              <p className="t-micro-bold text-faint case-upper tracking-label-wide mb-4 pb-2 border-b border-border">
                Loading State
              </p>
              <BtnRow label="Always on">
                <Button loading>Default</Button>
                <Button loading variant="outline">
                  Outline
                </Button>
                <Button loading variant="destructive">
                  Destructive
                </Button>
                <Button loading variant="secondary">
                  Secondary
                </Button>
                <Button loading size="sm">
                  Small
                </Button>
                <Button loading size="lg">
                  Large
                </Button>
              </BtnRow>
              <div className="mt-3">
                <BtnRow label="Toggle demo">
                  <Button loading={loading} onClick={triggerLoad}>
                    <Send /> {loading ? "Sending…" : "Click to Load"}
                  </Button>
                  <Button
                    loading={loading}
                    variant="outline"
                    onClick={triggerLoad}
                  >
                    <Download /> {loading ? "Exporting…" : "Export"}
                  </Button>
                </BtnRow>
              </div>
            </div>

            {/* Disabled */}
            <div>
              <p className="t-micro-bold text-faint case-upper tracking-label-wide mb-4 pb-2 border-b border-border">
                Disabled
              </p>
              <BtnRow label="All variants">
                <Button disabled>Default</Button>
                <Button disabled variant="destructive">
                  Destructive
                </Button>
                <Button disabled variant="outline">
                  Outline
                </Button>
                <Button disabled variant="secondary">
                  Secondary
                </Button>
                <Button disabled variant="ghost">
                  Ghost
                </Button>
                <Button disabled variant="link">
                  Link
                </Button>
              </BtnRow>
            </div>

            {/* Full width */}
            <div>
              <p className="t-micro-bold text-faint case-upper tracking-label-wide mb-4 pb-2 border-b border-border">
                Full Width
              </p>
              <div className="max-w-sm space-y-3">
                <Button className="w-full">
                  <Plus /> Create New Sale
                </Button>
                <Button className="w-full" variant="outline">
                  <Download /> Export Report
                </Button>
                <Button
                  className="w-full"
                  loading={loading}
                  onClick={triggerLoad}
                >
                  <Send /> {loading ? "Processing…" : "Submit & Send"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
