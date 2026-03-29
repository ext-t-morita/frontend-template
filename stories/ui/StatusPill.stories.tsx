import preview from "../../.storybook/preview";
import { StatusPill } from "../../packages/ui/src/components/ui/StatusPill";

const meta = preview.meta({
  title: "UI/StatusPill",
  component: StatusPill,
  args: {
    children: "Queued",
  },
});

export const Neutral = meta.story();

export const States = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusPill tone="info">In review</StatusPill>
      <StatusPill tone="success">Healthy</StatusPill>
      <StatusPill tone="warning">Needs attention</StatusPill>
      <StatusPill tone="danger">Blocked</StatusPill>
    </div>
  ),
});
