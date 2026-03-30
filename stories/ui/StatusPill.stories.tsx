import { StatusPill } from "@repo/ui";
import preview from "../../.storybook/preview";

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
