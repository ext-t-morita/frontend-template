import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import storybook from "eslint-plugin-storybook";

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
          paths: [
            {
              importNames: ["useMemo", "useCallback", "memo"],
              message:
                "React Compiler is enabled. Prefer compiler-first rendering and avoid useMemo, useCallback, and React.memo unless an explicitly documented exception is required.",
              name: "react",
            },
          ],
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
    files: ["stories/**/*.stories.@(ts|tsx)", ".storybook/**/*.{ts,tsx}"],
    rules: {
      "import/no-anonymous-default-export": "off",
      "storybook/no-title-property-in-meta": "off",
    },
  },
]);
