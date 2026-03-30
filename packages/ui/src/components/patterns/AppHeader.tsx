import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type AppHeaderMetric = {
  label: string;
  value: ReactNode;
};

type AppHeaderProps = {
  actions?: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  metrics?: AppHeaderMetric[];
  status?: ReactNode;
  title: ReactNode;
};

export function AppHeader({
  actions,
  className,
  description,
  eyebrow,
  metrics,
  status,
  title,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 shadow-[var(--shadow-surface)]",
        className,
      )}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-fg-muted)]">
              {eyebrow}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-[var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-[var(--color-fg-default)] md:text-5xl">
              {title}
            </h1>
            {status ? <div className="shrink-0">{status}</div> : null}
          </div>
          {description ? (
            <p className="max-w-3xl text-base leading-7 text-[var(--color-fg-muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      {metrics?.length ? (
        <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-sunken)] px-4 py-3"
              key={metric.label}
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                {metric.label}
              </dt>
              <dd className="mt-2 text-lg font-semibold text-[var(--color-fg-default)]">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}
