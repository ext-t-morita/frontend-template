import preview from "../../.storybook/preview";
import { Button } from "../../packages/ui/src/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../packages/ui/src/components/ui/Popover";

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
