import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

const collectFiles = (root: string): string[] =>
  readdirSync(projectPath(root), { withFileTypes: true }).flatMap((entry) => {
    const entryPath = `${root}/${entry.name}`;

    if (entry.isDirectory()) {
      return collectFiles(entryPath);
    }

    return entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")
      ? [entryPath]
      : [];
  });

const tailwindPaletteTokenPattern =
  /\b(?:text|bg|border|from|to|via|ring|stroke|fill)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}(?:\/\d{1,3})?\b/;

describe("design-system guardrails", () => {
  it("keeps the sample users table on the shared data-table foundation", () => {
    const userSummaryTable = readProjectFile(
      "features/users/components/UserSummaryTable.tsx",
    );

    expect(userSummaryTable).toContain("DataTable");
    expect(userSummaryTable).toContain("DataTableColumnHeader");
  });

  it("keeps stories on the public @repo/ui surface", () => {
    const storyFiles = [...collectFiles("stories")];

    for (const storyFile of storyFiles) {
      expect(readProjectFile(storyFile)).not.toContain("packages/ui/src/");
    }
  });

  it("documents an ESLint restriction against internal ui-package imports", () => {
    const eslintConfig = readProjectFile("eslint.config.mjs");

    expect(eslintConfig).toContain("Use the public @repo/ui entrypoint");
    expect(eslintConfig).toContain("packages/ui/src/**");
  });

  it("avoids palette classes and rgba literals in app-local UI code", () => {
    const appLocalFiles = [
      ...collectFiles("app"),
      ...collectFiles("components"),
      ...collectFiles("features"),
      "app/globals.css",
    ];

    for (const appLocalFile of appLocalFiles) {
      const fileContents = readProjectFile(appLocalFile);

      expect(fileContents).not.toMatch(tailwindPaletteTokenPattern);
      expect(fileContents).not.toContain("rgba(");
    }
  });
});
