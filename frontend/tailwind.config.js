/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        arrowMovement: {
          '0%': { opacity: '0', transform: 'translateX(0)' },
          '50%': { opacity: '1', transform: 'translateX(100%)' },
          '100%': { opacity: '0', transform: 'translateX(200%)' }, // Move further to the right
        },
      },
      animation: {
        arrowMovement: 'arrowMovement 2s infinite ease-in-out',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
