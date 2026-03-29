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

export const Destructive = meta.story({
  args: {
    tone: "destructive",
    children: "Delete workspace",
  },
});

export const Ghost = meta.story({
  args: {
    tone: "ghost",
    children: "Learn more",
  },
});

export const Large = meta.story({
  args: {
    size: "lg",
    children: "Ship update",
  },
});
