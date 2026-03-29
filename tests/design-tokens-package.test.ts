import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("design token package", () => {
  it("stores token source of truth in the shared package", () => {
    const tokenJson = JSON.parse(
      readProjectFile("packages/design-tokens/src/index.json"),
    ) as {
      semantic: { color: Record<string, string> };
      themes: {
        dark: {
          color: Record<string, string>;
          shadow?: Record<string, string>;
        };
        light: {
          color: Record<string, string>;
          shadow?: Record<string, string>;
        };
      };
    };

    expect(tokenJson.semantic.color["bg.canvas"]).toBe(
      "{base.color.neutral.50}",
    );
    expect(tokenJson.themes.dark.color["action.primary.bg"]).toBe("#388bff");
    expect(tokenJson.themes.dark.color["bg.sunken"]).toBeTruthy();
    expect(tokenJson.themes.dark.color["border.focus"]).toBeTruthy();
    expect(tokenJson.themes.dark.color["overlay.scrim"]).toBeTruthy();
    expect(tokenJson.themes.dark.color["danger.bg"]).toBeTruthy();
    expect(tokenJson.themes.light.color["bg.sunken"]).toBeTruthy();
    expect(tokenJson.themes.light.color["border.focus"]).toBeTruthy();
    expect(tokenJson.themes.light.color["overlay.scrim"]).toBeTruthy();
    expect(tokenJson.themes.light.color["danger.bg"]).toBeTruthy();
    expect(tokenJson.themes.light.shadow?.surface).toBeTruthy();
  });

  it("publishes generated CSS variables for app consumption", () => {
    const tokenCss = readProjectFile("packages/design-tokens/dist/tokens.css");

    expect(tokenCss).toContain("--color-bg-canvas");
    expect(tokenCss).toContain("--color-bg-sunken");
    expect(tokenCss).toContain("--color-border-focus");
    expect(tokenCss).toContain("--color-overlay-scrim");
    expect(tokenCss).toContain("--color-danger-bg");
    expect(tokenCss).toContain("--color-action-primary-bg");
    expect(tokenCss).toContain("--font-display");
    expect(tokenCss).toContain('[data-theme="light"]');
    expect(tokenCss).toContain('[data-theme="dark"]');
  });
});
