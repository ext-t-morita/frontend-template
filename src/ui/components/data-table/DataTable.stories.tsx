import preview from "#.storybook/preview";
import type { Column } from "./DataTable";
import { DataTable } from "./DataTable";

type UserRow = {
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  status: "Active" | "Invited" | "Suspended";
};

const sample: UserRow[] = [
  {
    name: "山田 太郎",
    email: "taro@example.com",
    role: "Owner",
    status: "Active",
  },
  {
    name: "佐藤 花子",
    email: "hanako@example.com",
    role: "Admin",
    status: "Invited",
  },
  {
    name: "田中 健",
    email: "ken@example.com",
    role: "Member",
    status: "Active",
  },
  {
    name: "鈴木 優",
    email: "yu@example.com",
    role: "Member",
    status: "Suspended",
  },
];

const columns: Column<UserRow>[] = [
  { key: "name", header: "氏名", sortable: true },
  { key: "email", header: "メールアドレス" },
  {
    key: "role",
    header: "ロール",
    sortable: true,
    render: (value) => (
      <span className="rounded-full bg-primary/10 px-2 py-1 font-semibold text-primary text-xs">
        {value}
      </span>
    ),
  },
  {
    key: "status",
    header: "ステータス",
    sortable: true,
    render: (value) => {
      const tone =
        value === "Active"
          ? "bg-primary/10 text-primary"
          : value === "Invited"
            ? "bg-secondary text-secondary-foreground"
            : "bg-destructive/10 text-destructive";
      return (
        <span className={`rounded-full px-2 py-1 font-semibold text-xs ${tone}`}>{value}</span>
      );
    },
  },
];

const meta = preview.meta({
  title: "UI/DataTable",
  component: DataTable<UserRow>,
  args: {
    data: sample,
    columns,
  },
});

export default meta;

export const Default = meta.story({});

export const Empty = meta.story({
  args: {
    data: [],
  },
});
