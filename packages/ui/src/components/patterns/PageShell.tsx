import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: PageShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-fg-muted)]">
            {eyebrow}
          </p>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-[var(--color-fg-default)] md:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-fg-muted)]">
            {description}
          </p>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>
      <section className="space-y-6">{children}</section>
    </main>
  );
}
