import type { ReactNode } from "react";

type SectionHeaderProps = {
  actions?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
};

export function SectionHeader({
  actions,
  description,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-fg-default)]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-fg-muted)]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
