"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Combobox, type ComboboxOption } from "../ui/Combobox";
import { DatePicker } from "../ui/DatePicker";
import { Field, FieldGroup } from "../ui/Field";
import { FormSection } from "../ui/FormSection";
import { Input } from "../ui/Input";
import { MultiSelect } from "../ui/MultiSelect";
import { SearchInput } from "../ui/SearchInput";
import { Switch } from "../ui/Switch";
import { Textarea } from "../ui/Textarea";

const ownerOptions: ComboboxOption[] = [
  {
    value: "ava",
    label: "Ava Quinn",
    description: "Platform operations lead",
    keywords: ["platform", "ops"],
  },
  {
    value: "jules",
    label: "Jules Park",
    description: "Growth systems owner",
    keywords: ["growth", "acquisition"],
  },
  {
    value: "nina",
    label: "Nina Kato",
    description: "Security and audit lead",
    keywords: ["security", "audit"],
  },
];

const regionOptions: ComboboxOption[] = [
  {
    value: "tokyo",
    label: "Tokyo",
    description: "Primary production region",
    keywords: ["apac", "jp"],
  },
  {
    value: "singapore",
    label: "Singapore",
    description: "Latency-optimized APAC fallback",
    keywords: ["apac", "sg"],
  },
  {
    value: "frankfurt",
    label: "Frankfurt",
    description: "EU governance and reporting",
    keywords: ["eu", "de"],
  },
];

const channelOptions: ComboboxOption[] = [
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

const tagOptions: ComboboxOption[] = [
  {
    value: "sox",
    label: "SOX",
    description: "Financial controls in scope",
  },
  {
    value: "pii",
    label: "PII",
    description: "User-identifiable data present",
  },
  {
    value: "retention",
    label: "Retention",
    description: "Extended audit retention enabled",
  },
  {
    value: "vendor-access",
    label: "Vendor Access",
    description: "Third-party operational access allowed",
  },
];

const settingsFormSchema = z.object({
  workspaceName: z.string().min(2, "Workspace name is required."),
  workspaceSlug: z
    .string()
    .min(2, "Workspace slug is required.")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens."),
  owner: z.string().min(1, "Choose an accountable owner."),
  alertRouting: z.string().min(2, "Provide a searchable alert channel."),
  region: z.string().min(1, "Choose a default region."),
  launchDate: z.string().min(1, "Pick a launch date."),
  channels: z
    .array(z.string())
    .min(1, "Select at least one notification channel."),
  complianceTags: z
    .array(z.string())
    .min(1, "Select at least one governance tag."),
  description: z
    .string()
    .min(24, "Add enough context for reviewers.")
    .max(280, "Keep the summary under 280 characters."),
  requireApproval: z.boolean(),
  auditDigest: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

type SettingsFormProps = {
  defaultValues?: Partial<SettingsFormValues>;
  dense?: boolean;
  disabled?: boolean;
  onSubmit?: (values: SettingsFormValues) => void | Promise<void>;
  showInitialErrors?: boolean;
  submitLabel?: string;
};

const fallbackValues: SettingsFormValues = {
  workspaceName: "Atlas Control Plane",
  workspaceSlug: "atlas-control-plane",
  owner: "ava",
  alertRouting: "atlas-ops",
  region: "tokyo",
  launchDate: "2026-04-15",
  channels: ["deployments", "security"],
  complianceTags: ["sox", "retention"],
  description:
    "Shared configuration for release approvals, audit digests, and region-level routing across the workspace.",
  requireApproval: true,
  auditDigest: true,
};

export function SettingsForm({
  defaultValues,
  dense = false,
  disabled = false,
  onSubmit,
  showInitialErrors = false,
  submitLabel = "Save settings",
}: SettingsFormProps) {
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      ...fallbackValues,
      ...defaultValues,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(settingsFormSchema),
  });

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = form;

  useEffect(() => {
    if (!showInitialErrors) {
      return;
    }

    void form.trigger();
  }, [form, showInitialErrors]);

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(async (values) => onSubmit?.(values))}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="info">React Hook Form</Badge>
        <Badge tone="warning">Zod validation</Badge>
        <Badge>Shared pattern</Badge>
      </div>

      <FormSection
        dense={dense}
        description="Define ownership, routing, and rollout metadata for a workspace-level settings page."
        title="Workspace basics"
      >
        <FieldGroup columns={2} dense={dense}>
          <Field
            description="Shown across internal navigation and approvals."
            error={errors.workspaceName?.message}
            htmlFor="workspaceName"
            label="Workspace name"
            required
          >
            <Input
              disabled={disabled}
              id="workspaceName"
              invalid={Boolean(errors.workspaceName)}
              {...register("workspaceName")}
            />
          </Field>

          <Field
            description="Stable slug used for URLs and automation."
            error={errors.workspaceSlug?.message}
            htmlFor="workspaceSlug"
            label="Workspace slug"
            required
          >
            <Input
              disabled={disabled}
              id="workspaceSlug"
              invalid={Boolean(errors.workspaceSlug)}
              {...register("workspaceSlug")}
            />
          </Field>

          <Field
            description="Primary accountable owner for change review."
            error={errors.owner?.message}
            label="Owner"
            required
          >
            <Controller
              control={control}
              name="owner"
              render={({ field }) => (
                <Combobox
                  disabled={disabled}
                  invalid={Boolean(errors.owner)}
                  onValueChange={field.onChange}
                  options={ownerOptions}
                  value={field.value}
                />
              )}
            />
          </Field>

          <Field
            description="Operational alert alias used by incident tooling."
            error={errors.alertRouting?.message}
            htmlFor="alertRouting"
            label="Alert routing"
            required
          >
            <SearchInput
              disabled={disabled}
              id="alertRouting"
              invalid={Boolean(errors.alertRouting)}
              placeholder="Searchable alias"
              {...register("alertRouting")}
            />
          </Field>
        </FieldGroup>
      </FormSection>

      <FormSection
        dense={dense}
        description="Control deployment region, effective date, and channel subscriptions."
        title="Operational controls"
      >
        <FieldGroup columns={2} dense={dense}>
          <Field
            description="Default region for workload routing."
            error={errors.region?.message}
            label="Primary region"
            required
          >
            <Controller
              control={control}
              name="region"
              render={({ field }) => (
                <Combobox
                  disabled={disabled}
                  invalid={Boolean(errors.region)}
                  onValueChange={field.onChange}
                  options={regionOptions}
                  value={field.value}
                />
              )}
            />
          </Field>

          <Field
            description="Date when the settings set becomes active."
            error={errors.launchDate?.message}
            label="Launch date"
            required
          >
            <Controller
              control={control}
              name="launchDate"
              render={({ field }) => (
                <DatePicker
                  disabled={disabled}
                  invalid={Boolean(errors.launchDate)}
                  onValueChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </Field>
        </FieldGroup>

        <Field
          description="Choose the channel groups that receive automated notifications."
          error={errors.channels?.message}
          label="Notification channels"
          required
        >
          <Controller
            control={control}
            name="channels"
            render={({ field }) => (
              <MultiSelect
                disabled={disabled}
                invalid={Boolean(errors.channels)}
                onValueChange={field.onChange}
                options={channelOptions}
                value={field.value}
              />
            )}
          />
        </Field>
      </FormSection>

      <FormSection
        dense={dense}
        description="Capture compliance posture and approval rules before rollout."
        title="Governance"
      >
        <FieldGroup columns={2} dense={dense}>
          <Field
            description="Compliance flags surfaced in review workflows."
            error={errors.complianceTags?.message}
            label="Governance tags"
            required
          >
            <Controller
              control={control}
              name="complianceTags"
              render={({ field }) => (
                <MultiSelect
                  disabled={disabled}
                  invalid={Boolean(errors.complianceTags)}
                  onValueChange={field.onChange}
                  options={tagOptions}
                  value={field.value}
                />
              )}
            />
          </Field>

          <Field
            description="Used as the approval sidebar summary."
            error={errors.description?.message}
            htmlFor="description"
            label="Approval summary"
            required
          >
            <Textarea
              disabled={disabled}
              id="description"
              invalid={Boolean(errors.description)}
              rows={dense ? 4 : 5}
              {...register("description")}
            />
          </Field>
        </FieldGroup>

        <FieldGroup columns={2} dense={dense}>
          <Controller
            control={control}
            name="requireApproval"
            render={({ field }) => (
              <Switch
                checked={field.value}
                disabled={disabled}
                label="Require approval for destructive changes"
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="auditDigest"
            render={({ field }) => (
              <Switch
                checked={field.value}
                disabled={disabled}
                label="Send weekly audit digest"
                onCheckedChange={field.onChange}
              />
            )}
          />
        </FieldGroup>
      </FormSection>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button
          disabled={disabled || isSubmitting}
          tone="secondary"
          type="button"
        >
          Preview changes
        </Button>
        <Button disabled={disabled || isSubmitting} type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
