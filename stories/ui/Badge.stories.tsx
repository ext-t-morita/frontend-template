import { Badge } from "@repo/ui";
import preview from "../../.storybook/preview";

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

export const Warning = meta.story({
  args: {
    tone: "warning",
    children: "Needs review",
  },
});
