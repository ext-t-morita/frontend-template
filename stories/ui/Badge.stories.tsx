import preview from "../../.storybook/preview";
import { Badge } from "../../packages/ui/src/components/ui/Badge";

const meta = preview.meta({
  title: "UI/Badge",
  component: Badge,
  args: {
    children: "Status",
  },
});

export const Neutral = meta.story();

export const Info = meta.story({
  args: {
    tone: "info",
    children: "Info",
  },
});

export const Success = meta.story({
  args: {
    tone: "success",
    children: "Healthy",
  },
});
