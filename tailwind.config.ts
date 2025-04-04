import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        min: "calc(100vh)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: "#E6FFAC",
          200: "#D4FF6A",
          300: "#B9FF2B",
          400: "#A9FF00",
          500: "#A9FF53",
          600: "#8AE53F",
          700: "#6CC72C",
          800: "#4DAC19",
          850: "#43BA00",
          900: "#3B9C09",
        },
        secondary: "#c76400",
        brightred: {
          100: "#FFB3B3",
          200: "#FF9B9B",
          300: "#FF7F7F",
          400: "#FF4C4C",
          500: "#FF3A3A",
          600: "#E63131",
          700: "#C72A2A",
          800: "#A62020",
          900: "#8C1A1A",
        },
        brightyellow: {
          100: "#FFF4B3",
          200: "#FFE68A",
          300: "#FFDD66",
          400: "#FFCF33",
          500: "#FFB800",
          600: "#E6A800",
          700: "#CC9800",
          800: "#B38700",
          900: "#9A6F00",
        },
        darkorange: {
          100: "#FFB84D",
          200: "#FF9C1A",
          300: "#FF8C00",
          400: "#E67C00",
          500: "#CC6B00",
          600: "#B35800",
          700: "#995000",
          800: "#804000",
          900: "#663300",
        },
        accent: {
          100: "#FFB3E0",
          200: "#FF9BD4",
          300: "#FF7FC6",
          400: "#FF5ABF",
          500: "#FF3AD4",
          600: "#E630B9",
          700: "#C628A3",
          800: "#A81F8C",
          900: "#8A1773",
        },
        black: {
          100: "#000000",
          200: "#141414",
          300: "#1F1F1F",
          400: "#282828",
          500: "#292929",
          600: "#3D3D3D",
          700: "#404040",
          800: "#444444",
          900: "#4A4F46",
        },
        white: {
          100: "#505050",
          200: "#6A6A6A",
          300: "#888888",
          400: "#979797",
          500: "#ADADAD",
          600: "#B3B3B3",
          700: "#D9D9D9",
          800: "#F5F5F5",
          900: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
