import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("ui primitives and playwright setup", () => {
  it("exports additional shared primitives from the UI package", () => {
    const indexFile = readProjectFile("packages/ui/src/index.ts");

    expect(indexFile).toContain("Input");
    expect(indexFile).toContain("Badge");
  });

  it("adds Storybook stories for foundations, primitives, and pages", () => {
    const inputStory = readProjectFile("stories/ui/Input.stories.tsx");
    const badgeStory = readProjectFile("stories/ui/Badge.stories.tsx");
    const foundationsStory = readProjectFile(
      "stories/foundations/ColorTokens.stories.tsx",
    );
    const pageStory = readProjectFile("stories/pages/HomePage.stories.tsx");

    expect(inputStory).toContain("preview.meta");
    expect(inputStory).toContain("meta.story");
    expect(badgeStory).toContain("preview.meta");
    expect(foundationsStory).toContain("preview.meta");
    expect(pageStory).toContain("preview.meta");
  });

  it("adds Playwright config and runnable app-level specs", () => {
    const playwrightConfig = readProjectFile("playwright.config.ts");
    const smokeSpec = readProjectFile("tests/e2e/smoke.spec.ts");
    const visualSpec = readProjectFile("tests/visual/homepage.spec.ts");
    const appPackage = JSON.parse(readProjectFile("package.json")) as {
      scripts: Record<string, string>;
      devDependencies: Record<string, string>;
    };

    expect(playwrightConfig).toContain("@playwright/test");
    expect(smokeSpec).toContain("test(");
    expect(visualSpec).toContain("toHaveScreenshot");
    expect(appPackage.scripts["test:e2e"]).toContain("playwright test");
    expect(appPackage.devDependencies["@playwright/test"]).toBeTruthy();
  });

  it("keeps the old sample src tree removed", () => {
    expect(existsSync(projectPath("src"))).toBe(false);
  });
});
