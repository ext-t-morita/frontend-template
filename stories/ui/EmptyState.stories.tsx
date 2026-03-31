import { Button, EmptyState } from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/EmptyState",
  component: EmptyState,
  args: {
    title: "No automation rules yet",
    description:
      "Add a first rule to keep repeated operational work inside the shared UI starter.",
    icon: "+",
    action: <Button>Create rule</Button>,
  },
});

export const Default = meta.story();

export const WithoutAction = meta.story({
  args: {
    action: undefined,
    icon: undefined,
  },
});
