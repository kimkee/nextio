import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': '#61dafb',
        'secondary': '#facc15',
      },
      fontSize: {
        '9': ['0.5625rem', '1.4'], // 10px
        '10': ['0.625rem', '1.4'], // 10px
        'xt': ['0.6875rem', '1.4'], // 11px
        '12': ['0.75rem', '1.4'], // 12px
        'ss': ['0.8125rem', '1.4'], // 13px
        'md': ['0.9375rem', '1.4'], // 15px
        '14': ['0.875rem', '1.4'], // 15px
        'xx': ['1.375rem', '1.4'], // 22px
      }
    },
  },
  plugins: [],
} satisfies Config;
