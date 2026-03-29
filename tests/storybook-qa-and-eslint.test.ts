import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("storybook QA and framework-aware linting", () => {
  it("adds ESLint config for Next.js and Storybook rules", () => {
    expect(existsSync(projectPath("eslint.config.mjs"))).toBe(true);

    const eslintConfig = readProjectFile("eslint.config.mjs");

    expect(eslintConfig).toContain("next/core-web-vitals");
    expect(eslintConfig).toContain("eslint-plugin-storybook");
  });

  it("extends the repository with framework-aware lint and Storybook a11y", () => {
    const packageJson = JSON.parse(readProjectFile("package.json")) as {
      scripts: Record<string, string>;
      devDependencies: Record<string, string>;
    };

    expect(packageJson.scripts["lint:framework"]).toBeDefined();
    expect(packageJson.scripts["lint:framework"]).toContain("eslint");
    expect(packageJson.devDependencies.eslint).toBeTruthy();
    expect(packageJson.devDependencies["eslint-config-next"]).toBeTruthy();
    expect(packageJson.devDependencies["eslint-plugin-storybook"]).toBeTruthy();
    expect(packageJson.devDependencies["@storybook/addon-a11y"]).toBeTruthy();
  });

  it("configures Storybook with QA addons", () => {
    const main = readProjectFile(".storybook/main.ts");

    expect(main).toContain("@storybook/addon-a11y");
  });

  it("wraps stories so single components are not stretched by the review grid", () => {
    const preview = readProjectFile(".storybook/preview.ts");

    expect(preview).toContain('width: "100%"');
    expect(preview).toContain("minWidth: 0");
  });

  it("runs framework-aware lint outside the fast pre-commit path", () => {
    const rootPackage = JSON.parse(readProjectFile("package.json")) as {
      scripts: Record<string, string>;
    };
    const lefthookConfig = readProjectFile("lefthook.yml");
    const ciWorkflow = readProjectFile(".github/workflows/ci.yml");

    expect(rootPackage.scripts["lint:framework"]).toBeDefined();
    expect(rootPackage.scripts["lint:framework"]).toContain("eslint");
    expect(lefthookConfig).toContain("pnpm lint:framework");
    expect(ciWorkflow).toContain("pnpm lint:framework");
  });
});
