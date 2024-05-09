/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#FFFFFF00",
        primary: "#000000",
        secondary: {
          DEFAULT: "#2979FF",
        },
        info: "#2196F3",
        success: "#00C853",
        warning: "#FFAB00",
        error: "#F44336",
      },
    },
  },
  plugins: [],
};
