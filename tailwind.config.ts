import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryGreen: "#38B887",
        secondaryGreen: "#127351",
        primaryGray: "#5B7275",
        secondaryGray: "#BCE4ED"
      },
      fontFamily: {
        primaryFont: ["Maven Pro", "Arial"],
        commercialFont: "Dancing Script"
      }
    },
  },
  plugins: [],
};
export default config;
