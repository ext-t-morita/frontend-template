import preview from "../../.storybook/preview";
import { Input } from "../../packages/ui/src/components/ui/Input";
import { Label } from "../../packages/ui/src/components/ui/Label";

const meta = preview.meta({
  title: "UI/Label",
  render: (args) => (
    <div className="max-w-sm space-y-3">
      <Label {...args} />
      <Input id="workspace-name" placeholder="Workspace name" />
    </div>
  ),
  args: {
    children: "Workspace name",
    htmlFor: "workspace-name",
  },
});

export const Default = meta.story();

export const Required = meta.story({
  args: {
    required: true,
  },
});
