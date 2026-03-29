import { tokens } from "@repo/design-tokens";
import { Badge, Button, PageShell, SurfaceCard } from "@repo/ui";
import { UserSummaryTable } from "../../features/users/components/UserSummaryTable";
import type { UserSummary } from "../../features/users/server/getUserSummaries";

type HomePageViewProps = {
  users: UserSummary[];
};

export function HomePageView({ users }: HomePageViewProps) {
  const semanticColorCount = Object.keys(tokens.semantic.color).length;

  return (
    <PageShell
      eyebrow="Server-first scaffold"
      title="Commercial-grade UI workspace"
      description="The repository now favors shared packages, server components, and docs-driven decisions over page-local prototypes."
      actions={<Button>Open implementation brief</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <SurfaceCard>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge tone="info">Design system</Badge>
              <Badge tone="neutral">{semanticColorCount} semantic colors</Badge>
            </div>
            <h2 className="text-2xl font-semibold text-[var(--color-fg-default)]">
              Tokens, UI primitives, and docs now live at the repository root.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--color-fg-muted)]">
              The shared token package publishes semantic values and generated
              CSS variables for app consumption.
            </p>
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
              App shell
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-fg-default)]">
              <li>Server components by default</li>
              <li>Workspace packages for tokens and primitives</li>
              <li>Repository docs as the authoritative source</li>
            </ul>
          </div>
        </SurfaceCard>
      </div>
      <UserSummaryTable users={users} />
    </PageShell>
  );
}
