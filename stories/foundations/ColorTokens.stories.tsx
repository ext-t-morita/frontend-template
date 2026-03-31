import preview from "../../.storybook/preview";
import { tokens } from "../../packages/design-tokens/src";

const themePanels = [
  {
    label: "LITE",
    theme: "light",
    values: tokens.themes.light.color,
  },
  {
    label: "DARK",
    theme: "dark",
    values: tokens.themes.dark.color,
  },
] as const;

function ThemeTokenGrid() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {themePanels.map(({ label, theme, values }) => (
        <section
          className="space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-raised)]"
          data-theme={theme}
          key={theme}
        >
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-fg-subtle)]">
              {label}
            </p>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-fg-default)]">
                Theme Overview
              </h2>
              <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-selected)] px-3 py-1 text-xs font-medium text-[var(--color-fg-accent)]">
                {Object.keys(values).length} tokens
              </span>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[var(--color-fg-muted)]">
              Atlassian-inspired foundations with explicit surfaces, state
              layers, focus colors, and status semantics.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(values).map(([name, value]) => (
              <div
                className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-sunken)] p-4"
                key={name}
              >
                <div
                  className="h-20 rounded-[var(--radius-control)] border border-[var(--color-border-input)]"
                  style={{ backgroundColor: value }}
                />
                <div className="mt-3 space-y-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
                    {name}
                  </p>
                  <p className="text-sm text-[var(--color-fg-default)]">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = preview.meta({
  title: "Foundations/Color Tokens",
  component: ThemeTokenGrid,
});

export const LiteAndDark = meta.story();
