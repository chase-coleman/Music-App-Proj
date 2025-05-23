// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // make sure this matches your project structure
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}