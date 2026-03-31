import { Input, Label } from "@repo/ui";
import preview from "../../.storybook/preview";

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
