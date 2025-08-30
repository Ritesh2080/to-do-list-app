/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Includes all JS/TS/JSX/TSX files
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF", // Custom primary color
          secondary: "#9333EA", // Custom secondary color
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          poppins: ["Poppins", "sans-serif"] // Custom font
        },
      },
    },
  };
  