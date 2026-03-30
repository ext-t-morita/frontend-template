import { Card, ConfirmDestructiveAction, InviteUserDialog } from "@repo/ui";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "Patterns/Dialogs",
});

export const Default = meta.story({
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-fg-default)]">
            Confirm destructive action
          </h3>
          <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
            Shared review flow for irreversible business actions.
          </p>
          <ConfirmDestructiveAction
            confirmLabel="Delete workspace"
            description="Deleting this workspace removes approval state, automation bindings, and audit snapshots."
            title="Delete Atlas workspace?"
            triggerLabel="Delete workspace"
          />
        </div>
      </Card>
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-fg-default)]">
            Invite dialog
          </h3>
          <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
            Shared invite flow with role and group defaults.
          </p>
          <InviteUserDialog />
        </div>
      </Card>
    </div>
  ),
});
