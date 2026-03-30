import { Separator } from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/Separator",
  component: Separator,
});

export const Horizontal = meta.story({
  render: () => (
    <div className="max-w-md space-y-4">
      <div className="text-sm text-[var(--color-fg-default)]">Overview</div>
      <Separator />
      <div className="text-sm text-[var(--color-fg-muted)]">Detail panel</div>
    </div>
  ),
});

export const Vertical = meta.story({
  render: () => (
    <div className="flex h-20 items-center gap-4 text-sm text-[var(--color-fg-default)]">
      <span>List</span>
      <Separator className="h-full" orientation="vertical" />
      <span>Detail</span>
    </div>
  ),
});
