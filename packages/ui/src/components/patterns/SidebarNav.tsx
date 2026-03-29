import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type SidebarNavItem = {
  badge?: ReactNode;
  current?: boolean;
  description?: ReactNode;
  href?: string;
  label: string;
};

export type SidebarNavSection = {
  items: SidebarNavItem[];
  title?: ReactNode;
};

type SidebarNavProps = {
  brand?: ReactNode;
  footer?: ReactNode;
  sections: SidebarNavSection[];
};

export function SidebarNav({ brand, footer, sections }: SidebarNavProps) {
  return (
    <nav className="space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-surface)]">
      {brand ? (
        <div className="text-sm font-semibold text-[var(--color-fg-default)]">
          {brand}
        </div>
      ) : null}
      <div className="space-y-5">
        {sections.map((section) => (
          <div
            className="space-y-2"
            key={String(section.title ?? section.items[0]?.label ?? "section")}
          >
            {section.title ? (
              <p className="px-3 text-xs uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
                {section.title}
              </p>
            ) : null}
            <div className="space-y-1">
              {section.items.map((item) => (
                <a
                  className={cn(
                    "block rounded-[var(--radius-control)] px-3 py-3 transition-colors hover:bg-[var(--color-bg-neutral-hovered)]",
                    item.current && "bg-[var(--color-bg-selected)]",
                  )}
                  href={item.href ?? "#"}
                  key={item.label}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="space-y-1">
                      <span
                        className={cn(
                          "block text-sm font-medium text-[var(--color-fg-default)]",
                          item.current &&
                            "text-[var(--color-action-primary-bg)]",
                        )}
                      >
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="block text-sm leading-6 text-[var(--color-fg-muted)]">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                    {item.badge ? (
                      <span className="shrink-0">{item.badge}</span>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      {footer ? (
        <div className="border-t border-[var(--color-border-subtle)] pt-4">
          {footer}
        </div>
      ) : null}
    </nav>
  );
}
