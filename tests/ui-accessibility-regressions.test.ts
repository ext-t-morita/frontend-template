import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

const tokenJson = JSON.parse(
  readProjectFile("packages/design-tokens/src/index.json"),
) as {
  themes: {
    dark: { color: Record<string, string> };
    light: { color: Record<string, string> };
  };
};

const hexToRgb = (hex: string) => {
  const normalized = hex.startsWith("#") ? hex.slice(1) : hex;
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const value = Number.parseInt(expanded, 16);

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255] as const;
};

const parseColor = (value: string) => {
  if (value.startsWith("#")) {
    return { alpha: 1, rgb: hexToRgb(value) };
  }

  const match = value.match(/^rgba?\(([^)]+)\)$/);
  if (!match) {
    throw new Error(`Unsupported color format: ${value}`);
  }

  const parts = match[1].split(",").map((part) => part.trim());
  const [red, green, blue] = parts.slice(0, 3).map(Number);

  return {
    alpha: parts[3] === undefined ? 1 : Number(parts[3]),
    rgb: [red, green, blue] as const,
  };
};

const blendOnSurface = (theme: "light" | "dark", tokenName: string) => {
  const foreground = parseColor(tokenJson.themes[theme].color[tokenName]);
  const surface = parseColor(tokenJson.themes[theme].color["bg.surface"]);

  return foreground.rgb.map((channel, index) => {
    return (
      channel * foreground.alpha + surface.rgb[index] * (1 - foreground.alpha)
    );
  });
};

const relativeLuminance = (rgb: number[]) => {
  const linearized = rgb.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return (
    0.2126 * linearized[0] + 0.7152 * linearized[1] + 0.0722 * linearized[2]
  );
};

const contrastRatio = (foreground: number[], background: number[]) => {
  const [lighter, darker] = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort((left, right) => right - left);

  return (lighter + 0.05) / (darker + 0.05);
};

describe("picker invalid states", () => {
  it("keeps the danger border while focused", () => {
    for (const path of [
      "packages/ui/src/components/ui/Combobox.tsx",
      "packages/ui/src/components/ui/MultiSelect.tsx",
      "packages/ui/src/components/ui/DatePicker.tsx",
    ]) {
      expect(readProjectFile(path)).toContain(
        "border-[var(--color-border-danger)] focus-visible:border-[var(--color-border-danger)] focus-visible:ring-[var(--color-border-danger)]",
      );
    }
  });
});

describe("small status surfaces", () => {
  it("keeps info tones AA-compliant in both themes", () => {
    const badgeFile = readProjectFile(
      "packages/ui/src/components/ui/Badge.tsx",
    );
    const statusPillFile = readProjectFile(
      "packages/ui/src/components/ui/StatusPill.tsx",
    );

    expect(badgeFile).toMatch(
      /tone === "info"\s*&&\s*"bg-\[var\(--color-action-primary-bg\)\] text-\[var\(--color-action-primary-fg\)\]"/,
    );
    expect(statusPillFile).toMatch(
      /tone === "info"\s*&&\s*"bg-\[var\(--color-action-primary-bg\)\] text-\[var\(--color-action-primary-fg\)\]"/,
    );

    for (const theme of ["light", "dark"] as const) {
      const ratio = contrastRatio(
        parseColor(tokenJson.themes[theme].color["action.primary.fg"]).rgb,
        blendOnSurface(theme, "action.primary.bg"),
      );

      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps danger status pills AA-compliant in both themes", () => {
    const statusPillFile = readProjectFile(
      "packages/ui/src/components/ui/StatusPill.tsx",
    );

    expect(statusPillFile).toMatch(
      /tone === "danger"\s*&&\s*"bg-\[var\(--color-danger-bg\)\] text-\[var\(--color-fg-onBold\)\]"/,
    );

    for (const theme of ["light", "dark"] as const) {
      const ratio = contrastRatio(
        parseColor(tokenJson.themes[theme].color["fg.onBold"]).rgb,
        blendOnSurface(theme, "danger.bg"),
      );

      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  });
});
