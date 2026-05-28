import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      colors: {
        sky: {
          50: "#f0f9ff",
          100: "#dceefb",
          200: "#b8ddf5",
        },
        meadow: {
          50: "#f2f9f4",
          100: "#e3f0e7",
          400: "#7cb87c",
        },
        forest: {
          700: "#3d5a45",
          800: "#2f4a38",
          900: "#1e3328",
        },
        paper: {
          50: "#faf7f0",
          100: "#f5f0e6",
          300: "#e8dfd0",
        },
        terracotta: {
          400: "#c97b63",
          500: "#b86a52",
        },
      },
      boxShadow: {
        paper:
          "0 4px 24px -4px rgba(30, 51, 40, 0.12), 0 2px 8px -2px rgba(30, 51, 40, 0.06)",
        soft: "0 8px 32px -8px rgba(74, 124, 89, 0.15)",
      },
      animation: {
        "gentle-float": "gentleFloat 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
      keyframes: {
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [animate],
};

export default config;
