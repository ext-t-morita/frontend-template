import { PageShell, SettingsForm } from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "Patterns/SettingsForm",
});

export const Default = meta.story({
  render: () => (
    <PageShell
      actions={null}
      description="Commercial-grade settings surface with shared form primitives, validation, and pattern-level composition."
      eyebrow="Patterns"
      title="Workspace settings"
    >
      <SettingsForm />
    </PageShell>
  ),
});

export const DenseLayout = meta.story({
  render: () => (
    <PageShell
      actions={null}
      description="Dense variant for operational consoles and admin surfaces with higher information density."
      eyebrow="Patterns"
      title="Workspace settings"
    >
      <SettingsForm dense />
    </PageShell>
  ),
});

export const ValidationState = meta.story({
  render: () => (
    <PageShell
      actions={null}
      description="Default values can be overridden to force validation scenarios close to production workflows."
      eyebrow="Patterns"
      title="Workspace settings"
    >
      <SettingsForm
        defaultValues={{
          alertRouting: "",
          channels: [],
          complianceTags: [],
          description: "Too short",
          launchDate: "",
          owner: "",
          region: "",
          workspaceName: "",
          workspaceSlug: "Atlas Control Plane",
        }}
        showInitialErrors
      />
    </PageShell>
  ),
});
