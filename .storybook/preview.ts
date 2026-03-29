import { definePreview } from "@storybook/nextjs";

export default definePreview({
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
});
