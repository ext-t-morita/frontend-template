import preview from "../../.storybook/preview";
import { SurfaceCard } from "../../packages/ui/src/components/ui/SurfaceCard";

const meta = preview.meta({
  title: "UI/SurfaceCard",
  component: SurfaceCard,
  args: {
    children: (
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
          Surface
        </p>
        <h3 className="text-xl font-semibold text-[var(--color-fg-default)]">
          Elevated sections should stay token-driven.
        </h3>
        <p className="text-sm leading-6 text-[var(--color-fg-muted)]">
          This card is ready for app shell composition and pattern stories.
        </p>
      </div>
    ),
  },
});

export const Default = meta.story();
