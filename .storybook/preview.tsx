import a11yAddon from "@storybook/addon-a11y";
import { definePreview } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import "../src/app/globals.css";

const preview = definePreview({
  addons: [a11yAddon()],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Light or Dark theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "surface",
      options: {
        surface: { name: "surface", value: "#ffffff" },
        "surface-subtle": { name: "surface-subtle", value: "#f8fafc" },
        dark: { name: "dark", value: "#0f172a" },
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (_Story, context) => {
      const { theme = "light" } = context.globals as { theme?: "light" | "dark" };
      useEffect(() => {
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", theme === "dark");
        }
      }, [theme]);
      return <_Story />;
    },
  ],
});

export default preview;
