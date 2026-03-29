import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("React Compiler configuration", () => {
  it("enables the stable Next.js reactCompiler option", () => {
    const nextConfig = readProjectFile("next.config.ts");

    expect(nextConfig).toContain("reactCompiler: true");
  });

  it("installs the React Compiler Babel plugin as an exact devDependency", () => {
    const packageJson = JSON.parse(readProjectFile("package.json")) as {
      devDependencies: Record<string, string>;
    };

    expect(packageJson.devDependencies["babel-plugin-react-compiler"]).toBe(
      "1.0.0",
    );
  });

  it("documents the compiler-first memoization guidance", () => {
    const agents = readProjectFile("AGENTS.md");
    const implementationRules = readProjectFile(
      "docs/agents/04-implementation-rules.md",
    );
    const tooling = readProjectFile("docs/agents/06-tooling.md");

    expect(agents).toContain("React Compiler");
    expect(agents).toContain("useMemo");
    expect(implementationRules).toContain("React Compiler");
    expect(implementationRules).toContain("useMemo");
    expect(tooling).toContain("babel-plugin-react-compiler");
  });
});
