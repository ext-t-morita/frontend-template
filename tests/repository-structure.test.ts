import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("ideal future repository structure", () => {
  it("uses a pnpm workspace with a Next.js web app", () => {
    expect(existsSync(projectPath("pnpm-workspace.yaml"))).toBe(true);
    expect(existsSync(projectPath("apps/web/package.json"))).toBe(true);
    expect(existsSync(projectPath("apps/web/app/layout.tsx"))).toBe(true);
    expect(existsSync(projectPath("apps/web/app/page.tsx"))).toBe(true);
    expect(existsSync(projectPath("apps/web/next.config.ts"))).toBe(true);
  });

  it("keeps design tokens and UI in shared packages", () => {
    expect(existsSync(projectPath("packages/design-tokens/package.json"))).toBe(
      true,
    );
    expect(
      existsSync(projectPath("packages/design-tokens/src/index.json")),
    ).toBe(true);
    expect(existsSync(projectPath("packages/ui/package.json"))).toBe(true);
    expect(existsSync(projectPath("packages/ui/src/index.ts"))).toBe(true);
  });

  it("includes repository-level scaffolding for storybook and tests", () => {
    expect(existsSync(projectPath(".storybook/main.ts"))).toBe(true);
    expect(existsSync(projectPath(".storybook/preview.ts"))).toBe(true);
    expect(existsSync(projectPath(".storybook/manager.ts"))).toBe(true);
    expect(existsSync(projectPath("stories/foundations/README.md"))).toBe(true);
    expect(
      existsSync(projectPath("stories/foundations/ColorTokens.stories.tsx")),
    ).toBe(true);
    expect(existsSync(projectPath("stories/ui/Badge.stories.tsx"))).toBe(true);
    expect(existsSync(projectPath("stories/ui/Input.stories.tsx"))).toBe(true);
    expect(existsSync(projectPath("stories/pages/HomePage.stories.tsx"))).toBe(
      true,
    );
    expect(existsSync(projectPath("playwright.config.ts"))).toBe(true);
    expect(existsSync(projectPath("tests/e2e/smoke.spec.ts"))).toBe(true);
    expect(existsSync(projectPath("tests/visual/homepage.spec.ts"))).toBe(true);
    expect(existsSync(projectPath("tests/e2e/README.md"))).toBe(true);
    expect(existsSync(projectPath("tests/visual/README.md"))).toBe(true);
  });

  it("routes root scripts through the workspace app", () => {
    const packageJson = JSON.parse(readProjectFile("package.json")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts.dev).toContain("--filter");
    expect(packageJson.scripts.build).toContain("--filter");
  });
});
