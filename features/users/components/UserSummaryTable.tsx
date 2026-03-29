import { SurfaceCard } from "@repo/ui";
import type { UserSummary } from "../server/getUserSummaries";

type UserSummaryTableProps = {
  users: UserSummary[];
};

const statusTone: Record<UserSummary["status"], string> = {
  active: "text-emerald-300",
  invited: "text-sky-300",
  paused: "text-amber-300",
};

export function UserSummaryTable({ users }: UserSummaryTableProps) {
  return (
    <SurfaceCard>
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
            Users feature
          </p>
          <h2 className="text-xl font-semibold text-[var(--color-fg-default)]">
            Feature code owns its server contract and page-local presentation.
          </h2>
        </div>
        <div className="overflow-hidden rounded-[calc(var(--radius-lg)-6px)] border border-[var(--color-border-subtle)]">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[rgba(255,255,255,0.03)] text-[var(--color-fg-muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[var(--color-border-subtle)] text-[var(--color-fg-default)]"
                >
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3 text-[var(--color-fg-muted)]">
                    {user.role}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${statusTone[user.status]}`}
                  >
                    {user.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SurfaceCard>
  );
}
