import { Button, EntityDetailHeader, StatusPill } from "@repo/ui";
import preview from "../../.storybook/preview";
import { teamDetailStats, teamTags } from "../support/layoutPatternFixtures";

const meta = preview.meta({
  title: "Patterns/EntityDetailHeader",
});

export const Default = meta.story({
  render: () => (
    <div className="max-w-5xl">
      <EntityDetailHeader
        actions={
          <div className="flex flex-wrap gap-3">
            <Button tone="secondary">Open audit log</Button>
            <Button>Approve rollout</Button>
          </div>
        }
        description="High-level summary for a business entity page, including state, stats, tags, and approval actions."
        eyebrow="Patterns"
        stats={teamDetailStats}
        status={<StatusPill tone="success">Healthy</StatusPill>}
        tags={teamTags}
        title="Atlas Control Plane"
      />
    </div>
  ),
});
