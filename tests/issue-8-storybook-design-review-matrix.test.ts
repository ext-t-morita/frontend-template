import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("issue #8 storybook design review matrix", () => {
  it("adds toolbar globals and a shared review decorator to Storybook preview", () => {
    const previewSource = readProjectFile(".storybook/preview.ts");

    expect(previewSource).toContain("globalTypes");
    expect(previewSource).toContain("theme");
    expect(previewSource).toContain("density");
    expect(previewSource).toContain("surface");
    expect(previewSource).toContain("status");
    expect(previewSource).toContain("viewport");
    expect(previewSource).toContain("decorators");
  });

  it("adds a pattern-level design review matrix story", () => {
    const matrixStoryPath = projectPath(
      "stories/patterns/DesignReviewMatrix.stories.tsx",
    );

    expect(existsSync(matrixStoryPath)).toBe(true);

    const storySource = readFileSync(matrixStoryPath, "utf8");
    expect(storySource).toContain("preview.meta");
    expect(storySource).toContain("meta.story");
  });

  it("documents story responsibilities and matrix usage", () => {
    expect(existsSync(projectPath("stories/patterns/README.md"))).toBe(true);

    const readmeSource = readProjectFile("README.md");
    const patternsReadmeSource = readProjectFile("stories/patterns/README.md");

    expect(readmeSource).toContain("Storybook review matrix");
    expect(patternsReadmeSource).toContain("Design review matrix");
  });
});
