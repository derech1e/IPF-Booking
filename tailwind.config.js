/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cfd4df",
          200: "#9ea8bf",
          300: "#6e7d9e",
          400: "#3d517e",
          500: "#0d265e",
          600: "#0a1e4b",
          700: "#081738",
          800: "#050f26",
          900: "#030813"
        },
        secondary: {
          100: "#cfefec",
          200: "#9fdfd9",
          300: "#6ed0c7",
          400: "#3ec0b4",
          500: "#0eb0a1",
          600: "#0b8d81",
          700: "#086a61",
          800: "#064640",
          900: "#032320"
},
      },
    },
  },
  plugins: [],
}