import { DatePicker, Field } from "@repo/ui";
import { useState } from "react";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "UI/DatePicker",
});

function DatePickerPreview(props: {
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
        error={props.invalid ? "Pick an effective date." : undefined}
        label="Launch date"
      >
        <DatePicker
          disabled={props.disabled}
          invalid={props.invalid}
          onValueChange={setValue}
          value={value}
        />
      </Field>
    </div>
  );
}

export const Default = meta.story({
  render: () => (
    <DatePickerPreview
      description="Popover-driven date selection for schedule-oriented forms."
      value="2026-04-15"
    />
  ),
});

export const ErrorState = meta.story({
  render: () => (
    <DatePickerPreview
      description="Validation feedback remains attached to the shared field shell."
      invalid
    />
  ),
});

export const Disabled = meta.story({
  render: () => (
    <DatePickerPreview
      description="Read-only date selections still show the chosen value."
      disabled
      value="2026-04-15"
    />
  ),
});
