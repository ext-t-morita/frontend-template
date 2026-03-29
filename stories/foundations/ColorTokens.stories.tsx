import preview from "../../.storybook/preview";
import { tokens } from "../../packages/design-tokens/src";

function ColorTokenGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(tokens.themes.dark.color).map(([name, value]) => (
        <div
          key={name}
          className="rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-4"
        >
          <div
            className="h-20 rounded-[var(--radius-control)] border border-[var(--color-border-subtle)]"
            style={{ backgroundColor: value }}
          />
          <div className="mt-3 space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
              {name}
            </p>
            <p className="text-sm text-[var(--color-fg-default)]">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = preview.meta({
  title: "Foundations/Color Tokens",
  component: ColorTokenGrid,
});

export const DarkThemePalette = meta.story();
