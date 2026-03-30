"use client";

import {
  Button,
  DataTable,
  type DataTableColumnDef,
  DataTableColumnHeader,
  StatusPill,
} from "@repo/ui";
import type { UserSummary } from "../server/getUserSummaries";

type UserSummaryTableProps = {
  users: UserSummary[];
};

const statusTone: Record<
  UserSummary["status"],
  "success" | "info" | "warning"
> = {
  active: "success",
  invited: "info",
  paused: "warning",
};

function getStatusLabel(status: UserSummary["status"]) {
  if (status === "active") {
    return "Active";
  }

  if (status === "invited") {
    return "Invited";
  }

  return "Paused";
}

const columns: DataTableColumnDef<UserSummary>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => row.original.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "role",
    cell: ({ row }) => row.original.role,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "status",
    cell: ({ row }) => (
      <StatusPill tone={statusTone[row.original.status]}>
        {getStatusLabel(row.original.status)}
      </StatusPill>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
];

export function UserSummaryTable({ users }: UserSummaryTableProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          Users feature
        </p>
        <h2 className="text-xl font-semibold text-[var(--color-fg-default)]">
          Feature code now demonstrates the shared data-table contract.
        </h2>
      </div>
      <DataTable
        columns={columns}
        data={users}
        emptyDescription="Invite teammates or adjust the current search to populate this table."
        emptyTitle="No users matched this workspace view"
        searchKey="name"
        searchPlaceholder="Search users"
        toolbarActions={<Button tone="secondary">Invite user</Button>}
      />
    </div>
  );
}
