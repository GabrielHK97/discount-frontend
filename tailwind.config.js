/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fbbf24",
          secondary: "#f59e0b",
          accent: "#06b6d4",
          neutral: "#e5e7eb",
          "base-100": "#1e2b30",
          info: "#0284c7",
          success: "#22c55e",
          warning: "#fbbf24",
          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
