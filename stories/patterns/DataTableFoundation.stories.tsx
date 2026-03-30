import {
  Button,
  DataTable,
  type DataTableColumnDef,
  DataTableColumnHeader,
  PageShell,
} from "@repo/ui";
import preview from "../../.storybook/preview";

type TeamRow = {
  id: string;
  team: string;
  owner: string;
  status: string;
};

const data: TeamRow[] = [
  { id: "team-1", team: "Platform", owner: "Ava", status: "Healthy" },
  { id: "team-2", team: "Growth", owner: "Jules", status: "Review" },
  { id: "team-3", team: "Ops", owner: "Nina", status: "Blocked" },
  { id: "team-4", team: "Security", owner: "Theo", status: "Healthy" },
];

const columns: DataTableColumnDef<TeamRow>[] = [
  {
    accessorKey: "team",
    cell: ({ row }) => row.original.team,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team" />
    ),
  },
  {
    accessorKey: "owner",
    cell: ({ row }) => row.original.owner,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
  },
  {
    accessorKey: "status",
    cell: ({ row }) => row.original.status,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
];

const meta = preview.meta({
  title: "Patterns/DataTable Foundation",
});

export const Default = meta.story({
  render: () => (
    <PageShell
      eyebrow="Patterns"
      title="Data table foundation"
      description="Review shared list-page behavior with sorting, filtering, pagination, and selection enabled."
      actions={<Button>New team</Button>}
    >
      <DataTable
        columns={columns}
        data={data}
        searchKey="team"
        searchPlaceholder="Search teams"
        toolbarActions={<Button tone="secondary">Export CSV</Button>}
      />
    </PageShell>
  ),
});
