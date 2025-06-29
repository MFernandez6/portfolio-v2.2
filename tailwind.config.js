import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Geist",
          "Inter",
          "Sora",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        jeopardy: {
          blue: "#0a1a4f",
          blueLight: "#1e2a6d",
          blueDark: "#07123a",
          yellow: "#ffe066",
          yellowDark: "#ffd700",
          accent: "#2e3a8c",
        },
        glass: "rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "jeopardy-gradient":
          "linear-gradient(135deg, #0a1a4f 0%, #1e2a6d 50%, #07123a 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        glow: "0 0 16px 2px #ffe066",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in",
        float: "float 3s ease-in-out infinite",
        "rotate-360": "rotate-360 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "rotate-360": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [typography, animate],
};

export default config;
