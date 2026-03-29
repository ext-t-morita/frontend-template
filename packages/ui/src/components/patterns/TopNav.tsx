import { cn } from "../../lib/cn";

export type TopNavItem = {
  count?: number;
  current?: boolean;
  href?: string;
  label: string;
};

type TopNavProps = {
  items: TopNavItem[];
};

export function TopNav({ items }: TopNavProps) {
  return (
    <nav className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-2 shadow-[var(--shadow-surface)]">
      <div className="flex min-w-max gap-2">
        {items.map((item) => (
          <a
            className={cn(
              "inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2.5 text-sm font-medium transition hover:bg-[rgba(255,255,255,0.05)]",
              item.current
                ? "bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)]"
                : "text-[var(--color-fg-muted)]",
            )}
            href={item.href ?? "#"}
            key={item.label}
          >
            <span>{item.label}</span>
            {typeof item.count === "number" ? (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs",
                  item.current
                    ? "bg-[rgba(255,255,255,0.18)]"
                    : "bg-[rgba(255,255,255,0.08)] text-[var(--color-fg-default)]",
                )}
              >
                {item.count}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </nav>
  );
}
