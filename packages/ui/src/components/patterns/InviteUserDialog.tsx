"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Combobox, type ComboboxOption } from "../ui/Combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { MultiSelect } from "../ui/MultiSelect";

type InviteUserDialogProps = {
  groups?: ComboboxOption[];
  onInvite?: (payload: {
    access: string[];
    email: string;
    role: string;
  }) => void;
  roleOptions?: ComboboxOption[];
  triggerLabel?: string;
};

const defaultRoles: ComboboxOption[] = [
  {
    value: "admin",
    label: "Admin",
    description: "Full operational access",
  },
  {
    value: "operator",
    label: "Operator",
    description: "Can manage incidents and workflows",
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "Read-only visibility",
  },
];

const defaultGroups: ComboboxOption[] = [
  {
    value: "deployments",
    label: "Deployments",
    description: "Release coordination",
  },
  {
    value: "security",
    label: "Security",
    description: "Security approvals and audits",
  },
  {
    value: "billing",
    label: "Billing",
    description: "Spend review and invoices",
  },
];

export function InviteUserDialog({
  groups = defaultGroups,
  onInvite,
  roleOptions = defaultRoles,
  triggerLabel = "Invite user",
}: InviteUserDialogProps) {
  const [email, setEmail] = useState("alex@example.com");
  const [role, setRole] = useState("operator");
  const [access, setAccess] = useState<string[]>(["deployments", "security"]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite workspace user</DialogTitle>
          <DialogDescription>
            Give a teammate scoped access with role and group-level defaults.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field
            description="Use the address tied to the company identity provider."
            htmlFor="invite-email"
            label="Email"
          >
            <Input
              id="invite-email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </Field>
          <Field description="Default role for the invited user." label="Role">
            <Combobox
              onValueChange={setRole}
              options={roleOptions}
              value={role}
            />
          </Field>
          <Field
            description="Group-level access can be adjusted later from the team page."
            label="Access groups"
          >
            <MultiSelect
              onValueChange={setAccess}
              options={groups}
              value={access}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button tone="secondary">Save draft</Button>
          <Button
            onClick={() =>
              onInvite?.({
                access,
                email,
                role,
              })
            }
          >
            Send invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
