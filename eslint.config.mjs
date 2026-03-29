import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import storybook from "eslint-plugin-storybook";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "storybook-static/**",
      "coverage/**",
    ],
  },
  ...compat.config({
    extends: ["next/core-web-vitals"],
  }),
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
    ],
    settings: {
      next: {
        rootDir: ".",
      },
    },
  },
  {
    files: ["stories/**/*.stories.@(ts|tsx)", ".storybook/**/*.{ts,tsx}"],
    rules: {
      "import/no-anonymous-default-export": "off",
      "storybook/no-title-property-in-meta": "off",
    },
  },
];
