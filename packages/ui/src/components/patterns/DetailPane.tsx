import type { ReactNode } from "react";

export type DetailPaneItem = {
  hint?: ReactNode;
  label: ReactNode;
  value: ReactNode;
};

export type DetailPaneSection = {
  items: DetailPaneItem[];
  title: ReactNode;
};

type DetailPaneProps = {
  actions?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  sections: DetailPaneSection[];
  title: ReactNode;
};

export function DetailPane({
  actions,
  description,
  footer,
  sections,
  title,
}: DetailPaneProps) {
  return (
    <section className="space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 shadow-[var(--shadow-surface)]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold text-[var(--color-fg-default)]">
            {title}
          </h3>
          {description ? (
            <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <div className="space-y-5">
        {sections.map((section) => (
          <div
            className="space-y-3 border-t border-[var(--color-border-subtle)] pt-5 first:border-t-0 first:pt-0"
            key={String(section.title)}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
              {section.title}
            </h4>
            <dl className="space-y-3">
              {section.items.map((item) => (
                <div
                  className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[rgba(255,255,255,0.03)] px-4 py-3"
                  key={String(item.label)}
                >
                  <dt className="text-xs uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-6 text-[var(--color-fg-default)]">
                    {item.value}
                  </dd>
                  {item.hint ? (
                    <p className="mt-1 text-sm leading-6 text-[var(--color-fg-muted)]">
                      {item.hint}
                    </p>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      {footer ? (
        <div className="border-t border-[var(--color-border-subtle)] pt-5">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
