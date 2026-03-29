import preview from "../../.storybook/preview";
import { Switch } from "../../packages/ui/src/components/ui/Switch";

const meta = preview.meta({
  title: "UI/Switch",
});

export const Default = meta.story({
  render: () => (
    <div className="max-w-md">
      <Switch
        defaultChecked
        description="Keep the Storybook canvas aligned with live product defaults."
        label="Enable review mode"
      />
    </div>
  ),
});
