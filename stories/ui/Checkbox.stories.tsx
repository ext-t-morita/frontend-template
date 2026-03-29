import preview from "../../.storybook/preview";
import { Checkbox } from "../../packages/ui/src/components/ui/Checkbox";

const meta = preview.meta({
  title: "UI/Checkbox",
});

export const Default = meta.story({
  render: () => (
    <Checkbox
      defaultChecked
      description="Include this item in the rollout checklist."
      label="Require sign-off"
    />
  ),
});

export const Disabled = meta.story({
  render: () => (
    <Checkbox
      defaultChecked
      description="Locked by policy."
      disabled
      label="Pinned option"
    />
  ),
});
