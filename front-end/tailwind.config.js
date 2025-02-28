/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Xanh đậm
        secondary: "#9333EA", // Tí
        background: {
          light: "#F3F4F6",
          dark: "#1E1E2E",
        },
        text: {
          light: "#111827",
          dark: "#E5E7EB",
        },
      },
      backgroundImage: {
        "gradient-pink-blue": "linear-gradient(135deg, #EC4899, #3B82F6)",
        "gradient-pink-purple": "linear-gradient(135deg, #EC4899, #9333EA)",
        "gradient-blue-yellow": "linear-gradient(135deg, #3B82F6, #FACC15)",
        "gradient-orange-yellow": "linear-gradient(135deg, #FB923C, #FACC15)",
      },
    },
  },
  plugins: [],
};
