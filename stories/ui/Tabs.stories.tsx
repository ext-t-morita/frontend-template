import preview from "../../.storybook/preview";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../packages/ui/src/components/ui/Tabs";

const meta = preview.meta({
  title: "UI/Tabs",
});

export const Default = meta.story({
  render: () => (
    <Tabs className="max-w-2xl" defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        Shared package summary and status.
      </TabsContent>
      <TabsContent value="activity">
        Recent deploy and review history.
      </TabsContent>
      <TabsContent value="security">Access scopes and approvals.</TabsContent>
    </Tabs>
  ),
});
