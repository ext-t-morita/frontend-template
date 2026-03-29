import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(import.meta.dirname, "..", path), "utf8");

describe("select rendering regression", () => {
  it("renders SelectContent children inside the Radix viewport", () => {
    const selectSource = readProjectFile(
      "packages/ui/src/components/ui/Select.tsx",
    );

    expect(selectSource).toContain(
      '<SelectPrimitive.Viewport className="p-1.5">',
    );
    expect(selectSource).toContain("{children}");
    expect(selectSource).not.toContain(
      '<SelectPrimitive.Viewport className="p-1.5" />',
    );
  });
});
