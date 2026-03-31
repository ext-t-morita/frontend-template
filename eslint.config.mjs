import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import storybook from "eslint-plugin-storybook";

const reactCompilerImportRestrictions = [
  {
    importNames: ["useMemo", "useCallback", "memo"],
    message:
      "React Compiler is enabled. Prefer compiler-first rendering and avoid useMemo, useCallback, and React.memo unless an explicitly documented exception is required.",
    name: "react",
  },
];

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
    "coverage/**",
  ]),
  ...storybook.configs["flat/recommended"],
  {
    settings: {
      next: {
        rootDir: ".",
      },
    },
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    files: [
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
      "features/**/*.{ts,tsx}",
      "packages/**/*.{ts,tsx}",
    ],
    settings: {
      next: {
        rootDir: ".",
      },
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: reactCompilerImportRestrictions,
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          message:
            "React Compiler is enabled. Prefer compiler-first rendering and avoid React.useMemo unless an explicitly documented exception is required.",
          selector:
            "MemberExpression[object.name='React'][property.name='useMemo']",
        },
        {
          message:
            "React Compiler is enabled. Prefer compiler-first rendering and avoid React.useCallback unless an explicitly documented exception is required.",
          selector:
            "MemberExpression[object.name='React'][property.name='useCallback']",
        },
        {
          message:
            "React Compiler is enabled. Prefer compiler-first rendering and avoid React.memo unless an explicitly documented exception is required.",
          selector:
            "MemberExpression[object.name='React'][property.name='memo']",
        },
      ],
    },
  },
  {
    files: [
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
      "features/**/*.{ts,tsx}",
      "stories/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: reactCompilerImportRestrictions,
          patterns: [
            {
              group: ["**/packages/ui/src/**"],
              message:
                "Use the public @repo/ui entrypoint instead of importing from packages/ui/src directly.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["stories/**/*.stories.@(ts|tsx)", ".storybook/**/*.{ts,tsx}"],
    rules: {
      "import/no-anonymous-default-export": "off",
      "storybook/no-title-property-in-meta": "off",
    },
  },
]);
