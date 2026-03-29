import path from "node:path";
import { defineMain } from "@storybook/nextjs/node";

export default defineMain({
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(process.cwd(), "next.config.ts"),
    },
  },
});
