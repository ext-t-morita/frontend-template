import { useState } from "react";
import preview from "../../.storybook/preview";
import {
  Combobox,
  type ComboboxOption,
} from "../../packages/ui/src/components/ui/Combobox";
import { Field } from "../../packages/ui/src/components/ui/Field";

const options: ComboboxOption[] = [
  {
    value: "ava",
    label: "Ava Quinn",
    description: "Platform operations lead",
  },
  {
    value: "jules",
    label: "Jules Park",
    description: "Growth systems owner",
  },
  {
    value: "nina",
    label: "Nina Kato",
    description: "Security and audit lead",
  },
];

const meta = preview.meta({
  title: "UI/Combobox",
});

function ComboboxPreview(props: {
  description: string;
  disabled?: boolean;
  invalid?: boolean;
  value?: string;
}) {
  const [value, setValue] = useState(props.value ?? "");

  return (
    <div className="max-w-md">
      <Field
        description={props.description}
        error={props.invalid ? "Choose a valid owner." : undefined}
        label="Owner"
      >
        <Combobox
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
    <ComboboxPreview
      description="Searchable single-select built on shared popover primitives."
      value="ava"
    />
  ),
});

export const ErrorState = meta.story({
  render: () => (
    <ComboboxPreview
      description="Validation and helper copy stay attached to the field shell."
      invalid
    />
  ),
});

export const Disabled = meta.story({
  render: () => (
    <ComboboxPreview
      description="Selection is locked after the change window starts."
      disabled
      value="nina"
    />
  ),
});
