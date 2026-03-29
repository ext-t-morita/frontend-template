import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

describe("tailwind workspace pipeline", () => {
  it("configures the Tailwind PostCSS plugin", () => {
    const postcssConfigPath = projectPath("postcss.config.mjs");

    expect(existsSync(postcssConfigPath)).toBe(true);

    const postcssConfig = readProjectFile("postcss.config.mjs");

    expect(postcssConfig).toContain("@tailwindcss/postcss");
  });

  it("registers workspace sources for utility generation", () => {
    const globalsCss = readProjectFile("app/globals.css");

    expect(globalsCss).toContain('@import "tailwindcss" source(none);');
    expect(globalsCss).toContain('@source "../app";');
    expect(globalsCss).toContain('@source "../components";');
    expect(globalsCss).toContain('@source "../features";');
    expect(globalsCss).toContain('@source "../stories";');
    expect(globalsCss).toContain('@source "../packages/ui/src";');
  });

  it("shows a ghost button story alongside tone variants", () => {
    const buttonStories = readProjectFile("stories/ui/Button.stories.tsx");

    expect(buttonStories).toContain("export const Ghost");
    expect(buttonStories).toContain('tone: "ghost"');
  });
});
