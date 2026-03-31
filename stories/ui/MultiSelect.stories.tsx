import { type ComboboxOption, Field, MultiSelect } from "@repo/ui";
import { useState } from "react";
import preview from "../../.storybook/preview";

const options: ComboboxOption[] = [
  {
    value: "deployments",
    label: "Deployments",
    description: "Release and incident alerts",
  },
  {
    value: "security",
    label: "Security",
    description: "Policy changes and escalations",
  },
  {
    value: "approvals",
    label: "Approvals",
    description: "High-risk action approvals",
  },
  {
    value: "billing",
    label: "Billing",
    description: "Spend anomalies and invoice notices",
  },
];

const meta = preview.meta({
  title: "UI/MultiSelect",
});

function MultiSelectPreview(props: {
  description: string;
  disabled?: boolean;
  invalid?: boolean;
  value?: string[];
}) {
  const [value, setValue] = useState(props.value ?? []);

  return (
    <div className="max-w-xl">
      <Field
        description={props.description}
        error={props.invalid ? "Select at least one channel." : undefined}
        label="Notification channels"
      >
        <MultiSelect
          disabled={props.disabled}
          invalid={props.invalid}
          onValueChange={setValue}
          options={options}
          value={value}
        />
      </Field>
    </div>
  );
}

export const Default = meta.story({
  render: () => (
    <MultiSelectPreview
      description="Searchable multi-select with inline badges for the current selection."
      value={["deployments", "security"]}
    />
  ),
});

export const ErrorState = meta.story({
  render: () => (
    <MultiSelectPreview
      description="The field shell surfaces validation alongside the current input state."
      invalid
    />
  ),
});

export const Disabled = meta.story({
  render: () => (
    <MultiSelectPreview
      description="Selections can be rendered read-only without dropping context."
      disabled
      value={["approvals", "billing"]}
    />
  ),
});
