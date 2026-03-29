import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  engines?: Record<string, string>;
};

const readPackageJson = (path: string) =>
  JSON.parse(
    readFileSync(resolve(import.meta.dirname, "..", path), "utf8"),
  ) as PackageJson;

const exactVersionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

const expectExactExternalVersions = (versions: Record<string, string>) => {
  for (const [name, version] of Object.entries(versions)) {
    if (version.startsWith("workspace:")) {
      continue;
    }

    expect(
      version,
      `${name} should use an exact version instead of a floating range`,
    ).toMatch(exactVersionPattern);
  }
};

describe("dependency version policy", () => {
  it("pins direct root dependencies and devDependencies to exact versions", () => {
    const packageJson = readPackageJson("package.json");

    expectExactExternalVersions(packageJson.dependencies ?? {});
    expectExactExternalVersions(packageJson.devDependencies ?? {});
  });

  it("pins direct shared package dependencies to exact versions", () => {
    const packageJson = readPackageJson("packages/ui/package.json");

    expectExactExternalVersions(packageJson.dependencies ?? {});
    expectExactExternalVersions(packageJson.devDependencies ?? {});
  });

  it("declares the minimum Node.js version required by Next.js 16", () => {
    const packageJson = readPackageJson("package.json");

    expect(packageJson.engines).toBeDefined();
    expect(packageJson.engines?.node).toBe(">=20.9.0");
  });
});
