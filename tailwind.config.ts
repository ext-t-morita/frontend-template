import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        serif: ["var(--font-family-serif)"],
        heading: ["var(--font-family-serif)"],
      },
    },
  },
  plugins: [],
};

export default config;
