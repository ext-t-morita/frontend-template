import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export function EmptyState({
  action,
  className,
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-bg-sunken)] p-6 text-left",
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-bg-selected)] text-lg text-[var(--color-fg-accent)]">
          {icon}
        </div>
      ) : null}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[var(--color-fg-default)]">
          {title}
        </h3>
        <p className="max-w-xl text-sm leading-6 text-[var(--color-fg-muted)]">
          {description}
        </p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
