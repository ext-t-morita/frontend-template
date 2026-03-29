import preview from "../../.storybook/preview";
import { IconButton } from "../../packages/ui/src/components/ui/IconButton";

const meta = preview.meta({
  title: "UI/IconButton",
  component: IconButton,
  args: {
    "aria-label": "Add item",
    children: "+",
  },
});

export const Secondary = meta.story();

export const Primary = meta.story({
  args: {
    tone: "primary",
  },
});

export const Ghost = meta.story({
  args: {
    tone: "ghost",
  },
});
