import {
  Button,
  DetailPane,
  PageShell,
  PanelLayout,
  SettingsForm,
  SidebarNav,
  StatusPill,
  TopNav,
} from "@repo/ui";
import preview from "../../.storybook/preview";
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
