/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fredoka', 'sans-serif'],
      },
      colors: {
        'brand-yellow': '#FFD93D',
        'brand-orange': '#FF8E3C',
        'brand-red': '#FF6B6B',
        'brand-purple': '#C969A8',
        'brand-blue': '#4D96FF',
        'brand-green': '#6BCB77',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
  },
  plugins: [],
}