import fs from "node:fs";
import path from "node:path";

import { buildCssVariableMap } from "../../src/ui/tokens/index.ts";

const sortEntries = (entries: [string, string][]) => entries.sort(([a], [b]) => a.localeCompare(b));

const renderVars = (mode: "light" | "dark") => {
  const vars = buildCssVariableMap(mode);
  return sortEntries(Object.entries(vars))
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");
};

const rootBlock = renderVars("light");
const darkBlock = renderVars("dark");

const TEMPLATE = `/* AUTO-GENERATED: Run pnpm tokens:build (Lefthook pre-commit runs this) */
@custom-variant dark (&:is(.dark *));

:root {
${rootBlock}
}

.dark {
${darkBlock}
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-family-sans);
    letter-spacing: -0.011em;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background);
  }
}

/**
 * Base typography. This is not applied to elements which have an ancestor with a Tailwind text class.
 */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-size: var(--text-2xl);
      font-family: var(--font-family-serif);
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: -0.022em;
    }

    h2 {
      font-size: var(--text-xl);
      font-family: var(--font-family-serif);
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: -0.019em;
    }

    h3 {
      font-size: var(--text-lg);
      font-family: var(--font-family-serif);
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: -0.014em;
    }

    h4 {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
      letter-spacing: -0.011em;
    }

    p {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.6;
    }

    label {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    button {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
      transition: all 180ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    input {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }
  }
}

html {
  font-size: var(--font-size);
}

/* モダン SaaS カスタムスタイル */
@layer components {
  /* カードのホバーエフェクト */
  .card-hover {
    transition: all 180ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -8px rgba(79, 70, 229, 0.12),
      0 4px 12px -4px rgba(79, 70, 229, 0.08);
  }

  /* ボタンホバーエフェクト */
  .button-hover {
    transition: all 180ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .button-hover:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px -2px rgba(79, 70, 229, 0.2);
  }

  /* グラデーションアクセント */
  .gradient-accent {
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  }

  /* フォーカスリング */
  .focus-ring:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  /* ガラスモーフィズム効果 */
  .glass-effect {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .dark .glass-effect {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(51, 65, 85, 0.5);
  }
}

@layer components {
  .font-heading {
    font-family: var(--font-family-serif);
    font-weight: var(--font-weight-semibold);
  }
}
`;

const outFile = path.join(process.cwd(), "src/ui/tokens/variables.css");

fs.writeFileSync(outFile, `${TEMPLATE}\n`, { encoding: "utf8" });

console.log(`updated ${path.relative(process.cwd(), outFile)}`);
