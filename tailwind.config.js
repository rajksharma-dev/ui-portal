/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      // 🎨 Design System Colors
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1e40af",
        },
        secondary: "#0f172a",
        background: "#f1f5f9",
        sidebar: "#1e293b",
        card: "#ffffff",
        muted: "#64748b",
        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#dc2626",
      },

      // 📏 Layout Constants
      spacing: {
        sidebar: "240px",
        topbar: "56px",
      },

      // 🔤 Typography Scale
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "30px"],
        "2xl": ["24px", "34px"],
      },

      // 📦 Shadows (Card System)
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.05)",
        dropdown: "0 4px 12px rgba(0,0,0,0.1)",
      },

      // 🎚 Z-index Layers
      zIndex: {
        topbar: "100",
        sidebar: "90",
        dropdown: "200",
        modal: "300",
      },
    },
  },

  plugins: [],
};
