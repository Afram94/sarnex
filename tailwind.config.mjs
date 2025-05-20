/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#9cc0ab',
        },
      },
      animation: {
        dash: 'dash 1.5s linear infinite',
        spotlight: 'spotlight 8s ease-in-out infinite',
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: '-10' },
        },
        spotlight: {
          '0%, 100%': { backgroundPosition: '20% 30%' },
          '50%': { backgroundPosition: '80% 70%' },
        },
      },
    },
  },
  plugins: [],
};
