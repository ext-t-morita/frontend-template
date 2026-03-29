import preview from "../../.storybook/preview";
import { Button } from "../../packages/ui/src/components/ui/Button";

const meta = preview.meta({
  title: "UI/Button",
  component: Button,
  args: {
    children: "Confirm action",
  },
});

export const Primary = meta.story();

export const Secondary = meta.story({
  args: {
    tone: "secondary",
    children: "Secondary action",
  },
});
