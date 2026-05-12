/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 我們把思源宋體綁定到 serif 這個指令上
        serif: ['"Noto Serif TC"', 'serif'],
      }
    },
  },
  plugins: [],
}