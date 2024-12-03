import type { Config } from "tailwindcss";

export default {
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
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "blue-900": "var(--blue-900)",
        "gray-950": "var(--gray-950)",
        "gray-600": "var(--gray-600)",
        "gray-300": "var(--gray-300)",
        "gray-200": "var(--gray-200)",
        "blue-50": "var(--blue-50)",
        "success": "var(--success)",
        "error": "var(--error)",
      },
    },
  },
  plugins: [],
} satisfies Config;
