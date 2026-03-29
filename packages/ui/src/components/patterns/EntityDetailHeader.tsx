import type { ReactNode } from "react";

export type EntityDetailStat = {
  label: string;
  value: ReactNode;
};

type EntityDetailHeaderProps = {
  actions?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  stats?: EntityDetailStat[];
  status?: ReactNode;
  tags?: ReactNode;
  title: ReactNode;
};

export function EntityDetailHeader({
  actions,
  description,
  eyebrow,
  stats,
  status,
  tags,
  title,
}: EntityDetailHeaderProps) {
  return (
    <section className="space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 shadow-[var(--shadow-surface)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-fg-muted)]">
              {eyebrow}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-fg-default)]">
              {title}
            </h2>
            {status ? <div>{status}</div> : null}
          </div>
          {description ? (
            <p className="max-w-3xl text-sm leading-7 text-[var(--color-fg-muted)]">
              {description}
            </p>
          ) : null}
          {tags ? (
            <div className="flex flex-wrap items-center gap-2">{tags}</div>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      {stats?.length ? (
        <dl className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-sunken)] px-4 py-3"
              key={stat.label}
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                {stat.label}
              </dt>
              <dd className="mt-2 text-lg font-semibold text-[var(--color-fg-default)]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
