import preview from "../../.storybook/preview";
import { Input } from "../../packages/ui/src/components/ui/Input";

const meta = preview.meta({
  title: "UI/Input",
  component: Input,
  args: {
    placeholder: "Search users",
  },
});

export const Default = meta.story();

export const Disabled = meta.story({
  args: {
    disabled: true,
    value: "Disabled value",
  },
});

export const WithValue = meta.story({
  args: {
    value: "Active query",
  },
});

export const Invalid = meta.story({
  args: {
    invalid: true,
    value: "Pending approval",
  },
});
