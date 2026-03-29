import preview from "../../.storybook/preview";
import { Card } from "../../packages/ui/src/components/ui/Card";

const meta = preview.meta({
  title: "UI/Card",
  component: Card,
  args: {
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[var(--color-fg-default)]">
          Deployment status
        </h3>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Shared primitives should expose token-driven surfaces.
        </p>
      </div>
    ),
  },
});

export const Default = meta.story();

export const Muted = meta.story({
  args: {
    tone: "muted",
  },
});
