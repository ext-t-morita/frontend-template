import { Button, Popover, PopoverContent, PopoverTrigger } from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/Popover",
});

export const Default = meta.story({
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button tone="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--color-fg-default)]">
          Quick filter
        </h3>
        <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
          Use small overlays for contextual controls and short-form guidance.
        </p>
      </PopoverContent>
    </Popover>
  ),
});
