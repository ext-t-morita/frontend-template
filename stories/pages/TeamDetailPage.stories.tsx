import {
  AuditLogList,
  Button,
  Card,
  DetailPane,
  EntityDetailHeader,
  PageShell,
  SidebarNav,
  SplitView,
  StatusPill,
  TopNav,
} from "@repo/ui";
import preview from "../../.storybook/preview";
import {
  auditEntries,
  dashboardMetrics,
  sidebarSections,
  teamDetailSections,
  teamDetailStats,
  teamTags,
  topNavItems,
} from "../support/layoutPatternFixtures";

const meta = preview.meta({
  title: "Pages/TeamDetailPage",
});

export const Default = meta.story({
  render: () => (
    <PageShell
      actions={<Button tone="secondary">Back to teams</Button>}
      description="Detail page composition with summary header, split master/detail view, and nearby audit context."
      eyebrow="Pages"
      metrics={dashboardMetrics}
      navigation={<TopNav items={topNavItems} />}
      sidebar={
        <SidebarNav brand="Atlas workspace" sections={sidebarSections} />
      }
      status={<StatusPill tone="success">Healthy</StatusPill>}
      title="Team detail"
    >
      <EntityDetailHeader
        actions={
          <div className="flex flex-wrap gap-3">
            <Button tone="secondary">Open audit log</Button>
            <Button>Approve change</Button>
          </div>
        }
        description="Entity-level header optimized for detail pages that need stats, tags, and workflow actions."
        eyebrow="Team"
        stats={teamDetailStats}
        status={<StatusPill tone="success">Healthy</StatusPill>}
        tags={teamTags}
        title="Atlas Control Plane"
      />
      <SplitView
        detail={
          <>
            <DetailPane
              description="Use structured metadata on the detail side."
              sections={teamDetailSections}
              title="Control summary"
            />
            <AuditLogList entries={auditEntries} />
          </>
        }
        detailSticky
        master={
          <>
            <Card>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-[var(--color-fg-default)]">
                  Rollout summary
                </h3>
                <p className="text-sm leading-7 text-[var(--color-fg-muted)]">
                  Atlas Control Plane is used by every operator-facing workflow
                  and therefore keeps stricter approval and audit defaults than
                  the rest of the workspace.
                </p>
              </div>
            </Card>
            <Card>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-[var(--color-fg-default)]">
                  Review notes
                </h3>
                <ul className="space-y-2 text-sm leading-6 text-[var(--color-fg-default)]">
                  <li>
                    Approval threshold was raised on March 29 after audit
                    review.
                  </li>
                  <li>
                    Weekly digest is enabled for security and billing
                    stakeholders.
                  </li>
                  <li>
                    Next rollout window opens after the current blocked review
                    is resolved.
                  </li>
                </ul>
              </div>
            </Card>
          </>
        }
      />
    </PageShell>
  ),
});
