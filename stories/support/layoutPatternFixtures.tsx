import type { ReactNode } from "react";
import type { AppHeaderMetric } from "../../packages/ui/src/components/patterns/AppHeader";
import type { AuditLogEntry } from "../../packages/ui/src/components/patterns/AuditLogList";
import type { DetailPaneSection } from "../../packages/ui/src/components/patterns/DetailPane";
import type { EntityDetailStat } from "../../packages/ui/src/components/patterns/EntityDetailHeader";
import type { SidebarNavSection } from "../../packages/ui/src/components/patterns/SidebarNav";
import type { TopNavItem } from "../../packages/ui/src/components/patterns/TopNav";
import { Badge } from "../../packages/ui/src/components/ui/Badge";
import {
  type DataTableColumnDef,
  DataTableColumnHeader,
} from "../../packages/ui/src/components/ui/DataTable";
import { StatusPill } from "../../packages/ui/src/components/ui/StatusPill";

export type TeamRow = {
  id: string;
  lastAudit: string;
  owner: string;
  product: string;
  reviewers: number;
  status: "Healthy" | "Review" | "Blocked";
};

export const teamRows: TeamRow[] = [
  {
    id: "team-1",
    lastAudit: "2h ago",
    owner: "Ava Quinn",
    product: "Atlas Control Plane",
    reviewers: 4,
    status: "Healthy",
  },
  {
    id: "team-2",
    lastAudit: "5h ago",
    owner: "Jules Park",
    product: "Growth Console",
    reviewers: 2,
    status: "Review",
  },
  {
    id: "team-3",
    lastAudit: "1d ago",
    owner: "Nina Kato",
    product: "Identity Gate",
    reviewers: 6,
    status: "Blocked",
  },
  {
    id: "team-4",
    lastAudit: "4h ago",
    owner: "Theo Dunn",
    product: "Ops Assistant",
    reviewers: 3,
    status: "Healthy",
  },
];

function statusTone(status: TeamRow["status"]) {
  if (status === "Healthy") {
    return "success";
  }

  if (status === "Review") {
    return "warning";
  }

  return "danger";
}

export const teamColumns: DataTableColumnDef<TeamRow>[] = [
  {
    accessorKey: "product",
    cell: ({ row }) => row.original.product,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
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
    accessorKey: "reviewers",
    cell: ({ row }) => row.original.reviewers,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reviewers" />
    ),
  },
  {
    accessorKey: "lastAudit",
    cell: ({ row }) => row.original.lastAudit,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last audit" />
    ),
  },
  {
    accessorKey: "status",
    cell: ({ row }) => (
      <StatusPill tone={statusTone(row.original.status)}>
        {row.original.status}
      </StatusPill>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
];

export const dashboardMetrics: AppHeaderMetric[] = [
  { label: "Healthy teams", value: 12 },
  { label: "Pending reviews", value: 4 },
  { label: "Escalations", value: 2 },
  { label: "Weekly coverage", value: "98.2%" },
];

export const sidebarSections: SidebarNavSection[] = [
  {
    title: "Workspace",
    items: [
      {
        current: true,
        description: "Cross-team operational overview",
        label: "Operations",
      },
      {
        description: "Ownership, invites, and access policy",
        label: "Teams",
      },
      {
        description: "Approvals, retention, and audit policy",
        label: "Settings",
      },
    ],
  },
  {
    title: "Review",
    items: [
      {
        badge: <Badge tone="warning">4</Badge>,
        description: "Items waiting for explicit approval",
        label: "Approval queue",
      },
      {
        badge: <Badge tone="info">2</Badge>,
        description: "Recent audit anomalies",
        label: "Exceptions",
      },
    ],
  },
];

export const topNavItems: TopNavItem[] = [
  { count: 14, current: true, label: "Overview" },
  { count: 6, label: "Teams" },
  { count: 4, label: "Reviews" },
  { count: 18, label: "Audit log" },
];

export const auditEntries: AuditLogEntry[] = [
  {
    action: "Policy updated",
    actor: "Nina Kato",
    description: "Raised approval threshold for destructive billing actions.",
    id: "audit-1",
    target: "Billing controls",
    timestamp: "2026-03-29 09:20 JST",
    tone: "info",
  },
  {
    action: "Invite accepted",
    actor: "Alex Rivera",
    description:
      "Joined as Operator and synced to Deployments + Security groups.",
    id: "audit-2",
    target: "Workspace access",
    timestamp: "2026-03-29 08:55 JST",
    tone: "success",
  },
  {
    action: "Approval blocked",
    actor: "Review bot",
    description:
      "Blocked rollout because audit digest coverage dropped below threshold.",
    id: "audit-3",
    target: "Atlas Control Plane",
    timestamp: "2026-03-28 23:10 JST",
    tone: "danger",
  },
];

export const teamDetailStats: EntityDetailStat[] = [
  { label: "Open reviews", value: 3 },
  { label: "Last audit", value: "2h ago" },
  { label: "Members", value: 14 },
  { label: "Coverage", value: "99.1%" },
];

export const teamDetailSections: DetailPaneSection[] = [
  {
    title: "Ownership",
    items: [
      {
        hint: "Primary on-call and rollout owner",
        label: "Owner",
        value: "Ava Quinn",
      },
      {
        hint: "Operations review guild",
        label: "Review ring",
        value: "Platform review council",
      },
    ],
  },
  {
    title: "Controls",
    items: [
      {
        hint: "High-risk actions require explicit approval",
        label: "Approval policy",
        value: "Required",
      },
      {
        hint: "Digest goes out every Monday 09:00 JST",
        label: "Audit digest",
        value: "Enabled",
      },
    ],
  },
];

export const teamTags: ReactNode = (
  <>
    <Badge tone="info">APAC</Badge>
    <Badge tone="warning">SOX</Badge>
    <Badge>High trust</Badge>
  </>
);
