import { RadioGroup, RadioGroupItem } from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/RadioGroup",
});

export const Default = meta.story({
  render: () => (
    <RadioGroup defaultValue="balanced">
      <RadioGroupItem
        description="Keep a balance between density and readability."
        label="Balanced"
        value="balanced"
      />
      <RadioGroupItem
        description="Prioritize information density for operators."
        label="Compact"
        value="compact"
      />
    </RadioGroup>
  ),
});
