/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        lightBackground: "#ffffff",
        lightText: "#000000",
        lightPrimary: "#1DA1F2",
        lightSecondary: "#14171A",

        // Dark theme colors
        darkBackground: "#1a202c",
        darkText: "#f5f8fa",
        darkPrimary: "#1DA1F2",
        darkSecondary: "#657786",
      },
    },
  },
  plugins: [],
};
