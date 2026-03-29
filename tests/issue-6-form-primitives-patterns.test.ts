import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("issue #6 form primitives and patterns", () => {
  it("declares the form integration dependencies in packages/ui", () => {
    const packageJson = JSON.parse(
      readProjectFile("packages/ui/package.json"),
    ) as {
      dependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["react-hook-form"]).toBeTruthy();
    expect(packageJson.dependencies?.zod).toBeTruthy();
    expect(packageJson.dependencies?.["@hookform/resolvers"]).toBeTruthy();
  });

  it("exports the form primitives and patterns from packages/ui", () => {
    const indexFile = readProjectFile("packages/ui/src/index.ts");

    expect(indexFile).toContain("Field");
    expect(indexFile).toContain("FieldGroup");
    expect(indexFile).toContain("FormSection");
    expect(indexFile).toContain("SearchInput");
    expect(indexFile).toContain("Combobox");
    expect(indexFile).toContain("MultiSelect");
    expect(indexFile).toContain("DatePicker");
    expect(indexFile).toContain("SettingsForm");
  });

  it("adds UI and pattern stories for the form layer", () => {
    const uiStories = [
      "Field",
      "SearchInput",
      "Combobox",
      "MultiSelect",
      "DatePicker",
    ] as const;

    for (const storyName of uiStories) {
      expect(
        existsSync(projectPath(`stories/ui/${storyName}.stories.tsx`)),
      ).toBe(true);
    }

    const patternStoryPath = projectPath(
      "stories/patterns/SettingsForm.stories.tsx",
    );

    expect(existsSync(patternStoryPath)).toBe(true);
    expect(readFileSync(patternStoryPath, "utf8")).toContain("preview.meta");
  });
});
