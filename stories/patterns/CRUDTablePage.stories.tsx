import {
  Button,
  CRUDTablePage,
  DetailPane,
  SidebarNav,
  StatusPill,
} from "@repo/ui";
import preview from "../../.storybook/preview";
import {
  dashboardMetrics,
  sidebarSections,
  teamColumns,
  teamDetailSections,
  teamRows,
  topNavItems,
} from "../support/layoutPatternFixtures";

const meta = preview.meta({
  title: "Patterns/CRUDTablePage",
});

export const Default = meta.story({
  render: () => (
    <CRUDTablePage
      actions={<Button>New workspace</Button>}
      columns={teamColumns}
      data={teamRows}
      description="Reusable list-page pattern with shared header, navigation, table behavior, and side detail context."
      detailPanel={
        <DetailPane
          description="Use the side pane for reviewer guidance and workflow shortcuts."
          sections={teamDetailSections}
          title="Review guide"
        />
      }
      eyebrow="Patterns"
      metrics={dashboardMetrics}
      navItems={topNavItems}
      searchKey="product"
      searchPlaceholder="Search products"
      sidebar={
        <SidebarNav brand="Atlas workspace" sections={sidebarSections} />
      }
      status={<StatusPill tone="warning">4 pending reviews</StatusPill>}
      title="Workspace list"
      toolbarActions={<Button tone="secondary">Invite user</Button>}
    />
  ),
});
