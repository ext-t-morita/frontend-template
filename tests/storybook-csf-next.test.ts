import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("storybook CSF Next setup", () => {
  it("uses defineMain and definePreview for Storybook config", () => {
    const main = readProjectFile(".storybook/main.ts");
    const preview = readProjectFile(".storybook/preview.ts");

    expect(main).toContain("defineMain");
    expect(main).toContain("@storybook/nextjs/node");
    expect(preview).toContain("definePreview");
    expect(preview).toContain("@storybook/nextjs");
  });

  it("adds Storybook scripts to the workspace root package", () => {
    const packageJson = JSON.parse(readProjectFile("package.json")) as {
      scripts: Record<string, string>;
      devDependencies: Record<string, string>;
    };

    expect(packageJson.scripts.storybook).toContain("storybook dev");
    expect(packageJson.scripts["build-storybook"]).toContain("storybook build");
    expect(packageJson.devDependencies["@storybook/nextjs"]).toBeTruthy();
  });

  it("uses CSF Next stories for shared UI components", () => {
    const storyPath = "stories/ui/Button.stories.tsx";

    expect(existsSync(projectPath(storyPath))).toBe(true);

    const story = readProjectFile(storyPath);

    expect(story).toContain("import preview from");
    expect(story).toContain("preview.meta");
    expect(story).toContain("meta.story");
  });
});
