import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("CI and initialization baseline", () => {
  it("adds typecheck and token build scripts at the workspace root", () => {
    const packageJson = JSON.parse(readProjectFile("package.json")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts.typecheck).toBeDefined();
    expect(packageJson.scripts.typecheck).toContain("tsc");
    expect(packageJson.scripts["tokens:build"]).toBeDefined();
    expect(packageJson.scripts["tokens:build"]).toContain("generate-css");
    expect(packageJson.scripts.check).toContain("typecheck");
  });

  it("defines CI workflow for validation and storybook build", () => {
    expect(existsSync(projectPath(".github/workflows/ci.yml"))).toBe(true);

    const ciWorkflow = readProjectFile(".github/workflows/ci.yml");

    expect(ciWorkflow).toContain("node-version: 24.14.1");
    expect(ciWorkflow).toContain("pnpm install --frozen-lockfile");
    expect(ciWorkflow).toContain("pnpm tokens:build");
    expect(ciWorkflow).toContain("pnpm lint");
    expect(ciWorkflow).toContain("pnpm typecheck");
    expect(ciWorkflow).toContain("pnpm test");
    expect(ciWorkflow).toContain("pnpm build");
    expect(ciWorkflow).toContain("pnpm build-storybook");
  });

  it("ships an env example for project initialization", () => {
    expect(existsSync(projectPath(".env.example"))).toBe(true);

    const envExample = readProjectFile(".env.example");

    expect(envExample).toContain("NEXT_PUBLIC_APP_NAME");
    expect(envExample).toContain("AUTH_SECRET");
  });

  it("can regenerate the published token CSS from the JSON source", () => {
    expect(
      existsSync(projectPath("packages/design-tokens/scripts/generate-css.ts")),
    ).toBe(true);

    const generator = readProjectFile(
      "packages/design-tokens/scripts/generate-css.ts",
    );

    expect(generator).toContain("../dist/tokens.css");
    expect(generator).toContain("writeFileSync");
  });
});
