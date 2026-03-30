import {
  AuditLogList,
  Badge,
  Button,
  Card,
  PageShell,
  PanelLayout,
  SectionHeader,
  SidebarNav,
  StatusPill,
  TopNav,
} from "@repo/ui";
import preview from "../../.storybook/preview";
import {
  auditEntries,
  dashboardMetrics,
  sidebarSections,
  topNavItems,
} from "../support/layoutPatternFixtures";

const meta = preview.meta({
  title: "Pages/OperationsDashboardPage",
});

export const Default = meta.story({
  render: () => (
    <PageShell
      actions={<Button>Review escalations</Button>}
      description="Dashboard composition for operational review, metrics, and the most recent audit activity."
      eyebrow="Pages"
      metrics={dashboardMetrics}
      navigation={<TopNav items={topNavItems} />}
      sidebar={
        <SidebarNav brand="Atlas workspace" sections={sidebarSections} />
      }
      status={<StatusPill tone="warning">2 escalations</StatusPill>}
      title="Operations dashboard"
    >
      <PanelLayout aside={<AuditLogList entries={auditEntries} />} asideSticky>
        <SectionHeader
          actions={<Button tone="secondary">Open all reviews</Button>}
          description="Use cards for KPI overview, then drive into list and detail patterns."
          title="Signals"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <div className="space-y-3">
              <Badge tone="info">Coverage</Badge>
              <h3 className="text-2xl font-semibold text-[var(--color-fg-default)]">
                99.1%
              </h3>
              <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
                Weekly audit coverage stayed above the alert threshold.
              </p>
            </div>
          </Card>
          <Card>
            <div className="space-y-3">
              <Badge tone="warning">Approvals</Badge>
              <h3 className="text-2xl font-semibold text-[var(--color-fg-default)]">
                4 pending
              </h3>
              <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
                Destructive changes now require explicit approval in two teams.
              </p>
            </div>
          </Card>
          <Card>
            <div className="space-y-3">
              <Badge>Invites</Badge>
              <h3 className="text-2xl font-semibold text-[var(--color-fg-default)]">
                3 drafts
              </h3>
              <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
                Operator invites are staged for the next maintenance window.
              </p>
            </div>
          </Card>
        </div>
      </PanelLayout>
    </PageShell>
  ),
});
