import preview from "../../.storybook/preview";
import { PageShell } from "../../packages/ui/src/components/patterns/PageShell";
import { Badge } from "../../packages/ui/src/components/ui/Badge";
import { Button } from "../../packages/ui/src/components/ui/Button";
import { Card } from "../../packages/ui/src/components/ui/Card";
import { EmptyState } from "../../packages/ui/src/components/ui/EmptyState";
import { Input } from "../../packages/ui/src/components/ui/Input";
import { StatusPill } from "../../packages/ui/src/components/ui/StatusPill";
import { SurfaceCard } from "../../packages/ui/src/components/ui/SurfaceCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../packages/ui/src/components/ui/Tabs";

const densityGap = {
  compact: "gap-4",
  comfortable: "gap-6",
  relaxed: "gap-8",
} as const;

const buttonSize = {
  compact: "sm",
  comfortable: "md",
  relaxed: "lg",
} as const;

const statusTone = {
  danger: "danger",
  info: "info",
  neutral: "neutral",
  success: "success",
  warning: "warning",
} as const;

const meta = preview.meta({
  title: "Patterns/Design Review Matrix",
});

export const Default = meta.story({
  render: (_args, context) => {
    const density = context.globals.density ?? "comfortable";
    const status = context.globals.status ?? "info";
    const surface = context.globals.surface ?? "subtle";

    return (
      <PageShell
        eyebrow="Design review"
        title="Storybook review matrix"
        description="Switch theme, density, surface, status, and viewport from the toolbar to verify primitives and early patterns side by side."
        actions={<Button size={buttonSize[density]}>Approve baseline</Button>}
      >
        <div
          className={`grid lg:grid-cols-[1.2fr_0.8fr] ${densityGap[density]}`}
        >
          <SurfaceCard>
            <div
              className={`space-y-4 ${density === "compact" ? "text-sm" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="info">Matrix</Badge>
                <StatusPill tone={statusTone[status]}>Status review</StatusPill>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--color-fg-default)]">
                Primitive combinations should remain legible across toolbar
                states.
              </h2>
              <div className={`grid md:grid-cols-2 ${densityGap[density]}`}>
                <Card tone={surface === "flat" ? "muted" : "default"}>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--color-fg-default)]">
                      Input review
                    </p>
                    <Input placeholder="Search templates" />
                    <Button size={buttonSize[density]} tone="secondary">
                      Secondary action
                    </Button>
                  </div>
                </Card>
                <Card tone="muted">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[var(--color-fg-default)]">
                      Status emphasis
                    </p>
                    <StatusPill tone={statusTone[status]}>
                      Live sample
                    </StatusPill>
                    <Button size={buttonSize[density]}>Primary action</Button>
                  </div>
                </Card>
              </div>
            </div>
          </SurfaceCard>
          <SurfaceCard>
            <Tabs defaultValue="pattern">
              <TabsList>
                <TabsTrigger value="pattern">Pattern</TabsTrigger>
                <TabsTrigger value="empty">Empty</TabsTrigger>
              </TabsList>
              <TabsContent value="pattern">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[var(--color-fg-default)]">
                    Page-shell composition
                  </p>
                  <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
                    This panel exists to compare spacing, surface emphasis, and
                    status accent in a reusable pattern context.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="empty">
                <EmptyState
                  title="Nothing selected"
                  description="Use the toolbar to check how empty states behave across theme and surface changes."
                  action={
                    <Button size={buttonSize[density]}>Create item</Button>
                  }
                />
              </TabsContent>
            </Tabs>
          </SurfaceCard>
        </div>
      </PageShell>
    );
  },
});
