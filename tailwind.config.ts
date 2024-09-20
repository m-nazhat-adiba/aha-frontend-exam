import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        neutrals: {
          10: "#FFFFFF",
          50: "#e8e8e8",
          100: "#d1d1d1",
          200: "#bababa",
          300: "#a3a3a3",
          400: "#8c8c8c",
          500: "#747474",
          600: "#5d5d5d",
          700: "#464646",
          800: "#2f2f2f",
          900: "#181818",
        },
      },
    },
  },
  plugins: [],
};
export default config;
