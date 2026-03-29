import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("tooling configuration", () => {
  it("uses Biome for TypeScript linting and formatting scripts", () => {
    const packageJson = JSON.parse(readProjectFile("package.json")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts.lint).toContain("biome lint");
    expect(packageJson.scripts["format:biome"]).toContain("biome format");
    expect(packageJson.scripts["format:check:biome"]).toContain("biome format");
    expect(packageJson.scripts.prepare).toContain("lefthook install");
  });

  it("keeps Prettier for non-TypeScript formatting", () => {
    const packageJson = JSON.parse(readProjectFile("package.json")) as {
      scripts: Record<string, string>;
    };
    const prettierIgnore = readProjectFile(".prettierignore");

    expect(packageJson.scripts["format:prettier"]).toContain(
      "prettier --write",
    );
    expect(prettierIgnore).toContain("**/*.ts");
    expect(prettierIgnore).toContain("**/*.tsx");
  });

  it("limits Biome to TypeScript files", () => {
    const biomeConfig = JSON.parse(readProjectFile("biome.json")) as {
      files: { includes: string[] };
    };

    expect(biomeConfig.files.includes).toContain("**/*.ts");
    expect(biomeConfig.files.includes).toContain("**/*.tsx");
  });

  it("configures lefthook for staged formatting and push validation", () => {
    const lefthookConfig = readProjectFile("lefthook.yml");

    expect(lefthookConfig).toContain("pre-commit:");
    expect(lefthookConfig).toContain("pre-push:");
    expect(lefthookConfig).toContain("biome");
    expect(lefthookConfig).toContain("prettier");
    expect(lefthookConfig).toContain("pnpm test");
    expect(lefthookConfig).toContain("pnpm build");
  });

  it("documents the formatter, linter, and hook policy in AGENTS", () => {
    const agents = readProjectFile("AGENTS.md");

    expect(agents).toContain("Biome");
    expect(agents).toContain("Prettier");
    expect(agents).toContain("lefthook");
    expect(agents).toContain("cdpb");
    expect(agents).toContain("agent-browser");
    expect(agents).toContain("Playwright spec");
  });
});
