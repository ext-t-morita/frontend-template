import preview from "../../.storybook/preview";
import { DatePicker } from "../../packages/ui/src/components/ui/DatePicker";
import { Field, FieldGroup } from "../../packages/ui/src/components/ui/Field";
import { FormSection } from "../../packages/ui/src/components/ui/FormSection";
import { Input } from "../../packages/ui/src/components/ui/Input";
import { Textarea } from "../../packages/ui/src/components/ui/Textarea";

const meta = preview.meta({
  title: "UI/Field",
});

export const Default = meta.story({
  render: () => (
    <div className="max-w-2xl">
      <Field
        description="A short explanation that helps operators understand the intent of the value."
        htmlFor="field-default"
        label="Workspace name"
        required
      >
        <Input id="field-default" placeholder="Atlas Control Plane" />
      </Field>
    </div>
  ),
});

export const ErrorState = meta.story({
  render: () => (
    <div className="max-w-2xl">
      <Field
        description="Use the same slug in URLs and automation."
        error="Use lowercase letters, numbers, and hyphens."
        htmlFor="field-error"
        label="Workspace slug"
        required
      >
        <Input defaultValue="Atlas Control Plane" id="field-error" invalid />
      </Field>
    </div>
  ),
});

export const Disabled = meta.story({
  render: () => (
    <div className="max-w-2xl">
      <Field
        description="This field is locked until the environment is promoted."
        htmlFor="field-disabled"
        label="Primary region"
      >
        <Input defaultValue="Tokyo" disabled id="field-disabled" />
      </Field>
    </div>
  ),
});

export const DenseLayout = meta.story({
  render: () => (
    <div className="max-w-4xl">
      <FormSection
        dense
        description="Compact layout for dense settings surfaces."
        title="Dense form section"
      >
        <FieldGroup columns={2} dense>
          <Field
            description="Rendered with tighter spacing."
            htmlFor="field-dense-name"
            label="Workspace name"
          >
            <Input defaultValue="Atlas Control Plane" id="field-dense-name" />
          </Field>
          <Field
            description="Popover-based field also fits the dense layout."
            label="Launch date"
          >
            <DatePicker value="2026-04-15" />
          </Field>
        </FieldGroup>
        <Field
          description="Long-form helper text remains readable in dense mode."
          htmlFor="field-dense-summary"
          label="Approval summary"
        >
          <Textarea
            defaultValue="Shared configuration for release approvals, audit digests, and region-level routing."
            id="field-dense-summary"
            rows={4}
          />
        </Field>
      </FormSection>
    </div>
  ),
});
