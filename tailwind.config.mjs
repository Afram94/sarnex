/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        hunter: '#1f3d2b',
        army: '#5c6a5a',
        beige: '#cccab3',
      },
      animation: {
        dash: 'dash 1.5s linear infinite',
        spotlight: 'spotlight 8s ease-in-out infinite',
        wave: 'wave 6s ease-in-out infinite',
        blob1: 'blob1 18s ease-in-out infinite',
        blob2: 'blob2 28s ease-in-out infinite',
        blob3: 'blob3 22s ease-in-out infinite',

        // 👇 NEW ANIMATIONS ADDED HERE
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'typewriter': 'typing 3s steps(40, end), blink 0.8s step-end infinite',
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: '-10' },
        },
        spotlight: {
          '0%, 100%': { backgroundPosition: '20% 30%' },
          '50%': { backgroundPosition: '80% 70%' },
        },
        blob1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -50px) scale(1.1)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-40px, 60px) scale(1.05)' },
        },
        blob3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, 30px) scale(1.15)' },
        },

        // 👇 NEW KEYFRAMES ADDED HERE
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        typing: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' },
        },
      },
    },
  },
  plugins: [],
}
