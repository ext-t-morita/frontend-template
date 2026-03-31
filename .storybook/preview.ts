import { definePreview } from "@storybook/nextjs";
import { createElement } from "react";
import "@repo/design-tokens/styles.css";
import "../app/globals.css";

const viewportWidths = {
  mobile: "23rem",
  tablet: "48rem",
  desktop: "min(100%, 80rem)",
} as const;

const densityPadding = {
  compact: "1rem",
  comfortable: "1.5rem",
  relaxed: "2rem",
} as const;

const densityGap = {
  compact: "1rem",
  comfortable: "1.5rem",
  relaxed: "2rem",
} as const;

const surfaceBackground = {
  flat: "var(--color-bg-canvas)",
  subtle:
    "linear-gradient(180deg, var(--color-bg-sunken), var(--color-bg-surface))",
  elevated:
    "radial-gradient(circle at top left, var(--color-bg-accent-subtle), transparent 32%), var(--color-bg-surface)",
} as const;

const reviewDecorator = (Story, context) => {
  const theme = context.globals.theme ?? "dark";
  const density = context.globals.density ?? "comfortable";
  const surface = context.globals.surface ?? "subtle";
  const viewport = context.globals.viewport ?? "desktop";

  return createElement(
    "div",
    {
      "data-density": density,
      "data-status": context.globals.status ?? "info",
      "data-surface": surface,
      "data-theme": theme,
      style: {
        background: "var(--color-bg-canvas)",
        color: "var(--color-fg-default)",
        colorScheme: theme === "light" ? "light" : "dark",
        minHeight: "100vh",
        padding: densityPadding[density],
      },
    },
    createElement(
      "div",
      {
        style: {
          background: surfaceBackground[surface],
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-card)",
          margin: "0 auto",
          maxWidth: viewportWidths[viewport],
          minHeight: "calc(100vh - 3rem)",
          padding: densityPadding[density],
          display: "grid",
          gap: densityGap[density],
          alignItems: "start",
        },
      },
      createElement(
        "div",
        {
          style: {
            width: "100%",
            minWidth: 0,
          },
        },
        createElement(Story),
      ),
    ),
  );
};

export default definePreview({
  decorators: [reviewDecorator],
  globalTypes: {
    theme: {
      toolbar: {
        dynamicTitle: true,
        icon: "mirror",
        items: ["dark", "light"],
      },
    },
    density: {
      toolbar: {
        dynamicTitle: true,
        icon: "collapse",
        items: ["compact", "comfortable", "relaxed"],
      },
    },
    surface: {
      toolbar: {
        dynamicTitle: true,
        icon: "paintbrush",
        items: ["flat", "subtle", "elevated"],
      },
    },
    status: {
      toolbar: {
        dynamicTitle: true,
        icon: "flag",
        items: ["neutral", "info", "success", "warning", "danger"],
      },
    },
    viewport: {
      toolbar: {
        dynamicTitle: true,
        icon: "mobile",
        items: ["mobile", "tablet", "desktop"],
      },
    },
  },
  initialGlobals: {
    density: "comfortable",
    status: "info",
    surface: "subtle",
    theme: "light",
    viewport: "desktop",
  },
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
});
