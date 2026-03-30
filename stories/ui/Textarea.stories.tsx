import { Textarea } from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/Textarea",
  component: Textarea,
  args: {
    placeholder: "Describe the rollout plan",
    defaultValue:
      "Document token decisions, shared contracts, and QA expectations.",
  },
});

export const Default = meta.story();

export const Invalid = meta.story({
  args: {
    invalid: true,
    defaultValue: "This value requires follow-up before shipping.",
  },
});
