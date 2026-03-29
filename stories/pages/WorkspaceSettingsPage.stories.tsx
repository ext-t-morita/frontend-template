import preview from "../../.storybook/preview";
import { DetailPane } from "../../packages/ui/src/components/patterns/DetailPane";
import { PageShell } from "../../packages/ui/src/components/patterns/PageShell";
import { PanelLayout } from "../../packages/ui/src/components/patterns/PanelLayout";
import { SettingsForm } from "../../packages/ui/src/components/patterns/SettingsForm";
import { SidebarNav } from "../../packages/ui/src/components/patterns/SidebarNav";
import { TopNav } from "../../packages/ui/src/components/patterns/TopNav";
import { Button } from "../../packages/ui/src/components/ui/Button";
import { StatusPill } from "../../packages/ui/src/components/ui/StatusPill";
import {
  dashboardMetrics,
  sidebarSections,
  teamDetailSections,
  topNavItems,
} from "../support/layoutPatternFixtures";

const meta = preview.meta({
  title: "Pages/WorkspaceSettingsPage",
});

export const Default = meta.story({
  render: () => (
    <PageShell
      actions={<Button>Open audit policy</Button>}
      description="Settings page composition built from the shared form and detail patterns."
      eyebrow="Pages"
      metrics={dashboardMetrics}
      navigation={<TopNav items={topNavItems} />}
      sidebar={
        <SidebarNav brand="Atlas workspace" sections={sidebarSections} />
      }
      status={<StatusPill tone="warning">Approval policy updated</StatusPill>}
      title="Workspace settings"
    >
      <PanelLayout
        aside={
          <DetailPane
            description="Support content, checklists, and reviewer guidance stay out of the main form column."
            sections={teamDetailSections}
            title="Reviewer checklist"
          />
        }
        asideSticky
      >
        <SettingsForm />
      </PanelLayout>
    </PageShell>
  ),
});
