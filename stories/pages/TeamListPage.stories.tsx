import preview from "../../.storybook/preview";
import { CRUDTablePage } from "../../packages/ui/src/components/patterns/CRUDTablePage";
import { DetailPane } from "../../packages/ui/src/components/patterns/DetailPane";
import { SidebarNav } from "../../packages/ui/src/components/patterns/SidebarNav";
import { Button } from "../../packages/ui/src/components/ui/Button";
import { StatusPill } from "../../packages/ui/src/components/ui/StatusPill";
import {
  dashboardMetrics,
  sidebarSections,
  teamColumns,
  teamDetailSections,
  teamRows,
  topNavItems,
} from "../support/layoutPatternFixtures";

const meta = preview.meta({
  title: "Pages/TeamListPage",
});

export const Default = meta.story({
  render: () => (
    <CRUDTablePage
      actions={<Button>New team</Button>}
      columns={teamColumns}
      data={teamRows}
      description="Reusable list page for products, teams, or any table-driven business workflow."
      detailPanel={
        <DetailPane
          description="Detail pane carries the shared reviewer checklist."
          sections={teamDetailSections}
          title="Selected team"
        />
      }
      eyebrow="Pages"
      metrics={dashboardMetrics}
      navItems={topNavItems}
      searchKey="product"
      searchPlaceholder="Search teams"
      sidebar={
        <SidebarNav brand="Atlas workspace" sections={sidebarSections} />
      }
      status={<StatusPill tone="info">List view</StatusPill>}
      title="Teams"
      toolbarActions={<Button tone="secondary">Invite reviewer</Button>}
    />
  ),
});
