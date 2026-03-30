import type { ReactNode } from "react";
import { StatusPill } from "../ui/StatusPill";

export type AuditLogEntry = {
  action: string;
  actor: string;
  description?: ReactNode;
  id: string;
  target: string;
  timestamp: string;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
};

type AuditLogListProps = {
  entries: AuditLogEntry[];
  title?: string;
};

export function AuditLogList({
  entries,
  title = "Audit log",
}: AuditLogListProps) {
  return (
    <section className="space-y-4 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 shadow-[var(--shadow-surface)]">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-[var(--color-fg-default)]">
          {title}
        </h3>
        <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
          Review who changed what, when, and why before approving rollout.
        </p>
      </div>
      <div className="space-y-3">
        {entries.map((entry) => (
          <article
            className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-sunken)] px-4 py-4"
            key={entry.id}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill tone={entry.tone ?? "neutral"}>
                    {entry.action}
                  </StatusPill>
                  <span className="text-sm font-medium text-[var(--color-fg-default)]">
                    {entry.target}
                  </span>
                </div>
                <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
                  {entry.actor} • {entry.timestamp}
                </p>
                {entry.description ? (
                  <p className="text-sm leading-6 text-[var(--color-fg-default)]">
                    {entry.description}
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
