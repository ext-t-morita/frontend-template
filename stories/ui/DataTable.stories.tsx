import preview from "../../.storybook/preview";
import {
  DataTable,
  type DataTableColumnDef,
  DataTableColumnHeader,
} from "../../packages/ui/src/components/ui/DataTable";

type ProjectRow = {
  id: string;
  name: string;
  owner: string;
  status: string;
};

const data: ProjectRow[] = [
  { id: "1", name: "Identity refresh", owner: "Ava", status: "Active" },
  { id: "2", name: "Billing export", owner: "Jules", status: "Review" },
  { id: "3", name: "Audit sync", owner: "Nina", status: "Queued" },
  { id: "4", name: "Alert routing", owner: "Theo", status: "Paused" },
  { id: "5", name: "Template QA", owner: "Mira", status: "Active" },
  { id: "6", name: "Release notes", owner: "Iris", status: "Review" },
  { id: "7", name: "Entitlement sync", owner: "Sora", status: "Queued" },
  { id: "8", name: "Session audit", owner: "Lena", status: "Active" },
  { id: "9", name: "Contract export", owner: "Omar", status: "Review" },
  { id: "10", name: "Billing alert", owner: "Rae", status: "Paused" },
  { id: "11", name: "Token rebuild", owner: "Milo", status: "Active" },
  { id: "12", name: "Storybook polish", owner: "Esme", status: "Review" },
];

const columns: DataTableColumnDef<ProjectRow>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => row.original.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
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
  title: "UI/DataTable",
});

export const Default = meta.story({
  render: () => (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search projects"
    />
  ),
});

export const Loading = meta.story({
  render: () => <DataTable columns={columns} data={[]} isLoading />,
});

export const Failure = meta.story({
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      error="Unable to load the current table state. Retry after checking the shared API."
    />
  ),
});
