import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type FormSectionProps = HTMLAttributes<HTMLElement> & {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  dense?: boolean;
};

export function FormSection({
  actions,
  children,
  className,
  dense = false,
  description,
  title,
  ...props
}: FormSectionProps) {
  return (
    <section
      className={cn(
        "space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 shadow-[var(--shadow-surface)]",
        dense && "space-y-4 p-5",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1.5">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-fg-default)]">
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
      {children}
    </section>
  );
}
