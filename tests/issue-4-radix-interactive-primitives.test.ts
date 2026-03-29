import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectPath = (...segments: string[]) =>
  resolve(import.meta.dirname, "..", ...segments);

const readProjectFile = (path: string) =>
  readFileSync(projectPath(path), "utf8");

const storyNames = [
  "Accordion",
  "AlertDialog",
  "Checkbox",
  "Dialog",
  "Drawer",
  "DropdownMenu",
  "Popover",
  "RadioGroup",
  "Select",
  "Switch",
  "Tabs",
  "Tooltip",
] as const;

const exportNames = [
  ...storyNames,
  "DialogTrigger",
  "DialogContent",
  "AlertDialogTrigger",
  "AlertDialogContent",
  "DrawerTrigger",
  "DrawerContent",
  "DropdownMenuTrigger",
  "DropdownMenuContent",
  "PopoverTrigger",
  "PopoverContent",
  "SelectTrigger",
  "SelectContent",
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  "AccordionItem",
  "AccordionTrigger",
  "AccordionContent",
  "TooltipTrigger",
  "TooltipContent",
  "RadioGroupItem",
] as const;

const radixDependencies = [
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-select",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-tooltip",
] as const;

describe("issue #4 radix interactive primitives", () => {
  it("declares the required Radix dependencies in packages/ui", () => {
    const packageJson = JSON.parse(
      readProjectFile("packages/ui/package.json"),
    ) as {
      dependencies?: Record<string, string>;
    };

    for (const dependencyName of radixDependencies) {
      expect(packageJson.dependencies?.[dependencyName]).toBeTruthy();
    }
  });

  it("exports the interactive primitives from packages/ui", () => {
    const indexFile = readProjectFile("packages/ui/src/index.ts");

    for (const exportName of exportNames) {
      expect(indexFile).toContain(exportName);
    }
  });

  it("adds CSF Next stories for each interactive primitive", () => {
    for (const storyName of storyNames) {
      const storyPath = projectPath(`stories/ui/${storyName}.stories.tsx`);

      expect(existsSync(storyPath)).toBe(true);

      const storySource = readFileSync(storyPath, "utf8");
      expect(storySource).toContain("preview.meta");
      expect(storySource).toContain("meta.story");
    }
  });
});
