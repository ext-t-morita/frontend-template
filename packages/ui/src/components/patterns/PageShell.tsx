import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { AppHeader, type AppHeaderMetric } from "./AppHeader";

type PageShellProps = {
  actions?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  metrics?: AppHeaderMetric[];
  navigation?: ReactNode;
  sidebar?: ReactNode;
  status?: ReactNode;
  title: ReactNode;
};

export function PageShell({
  actions,
  children,
  contentClassName,
  description,
  eyebrow,
  metrics,
  navigation,
  sidebar,
  status,
  title,
}: PageShellProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
      <div
        className={cn(
          "grid gap-6",
          Boolean(sidebar) && "xl:grid-cols-[17rem_minmax(0,1fr)]",
        )}
      >
        {sidebar ? (
          <aside className="xl:sticky xl:top-6">{sidebar}</aside>
        ) : null}
        <div className="min-w-0 space-y-6">
          <AppHeader
            actions={actions}
            description={description}
            eyebrow={eyebrow}
            metrics={metrics}
            status={status}
            title={title}
          />
          {navigation ? <div>{navigation}</div> : null}
          <section className={cn("space-y-6", contentClassName)}>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
