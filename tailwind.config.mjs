/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        dash: 'dash 1.5s linear infinite',
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: '-10' },
        },
      },
    },
  },
  plugins: [],
}
