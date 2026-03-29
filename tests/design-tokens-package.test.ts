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
      themes: { dark: { color: Record<string, string> } };
    };

    expect(tokenJson.semantic.color["bg.canvas"]).toBe(
      "{base.color.slate.950}",
    );
    expect(tokenJson.themes.dark.color["action.primary.bg"]).toBe("#4c7dff");
  });

  it("publishes generated CSS variables for app consumption", () => {
    const tokenCss = readProjectFile("packages/design-tokens/dist/tokens.css");

    expect(tokenCss).toContain("--color-bg-canvas");
    expect(tokenCss).toContain("--color-action-primary-bg");
    expect(tokenCss).toContain("--font-display");
  });
});
