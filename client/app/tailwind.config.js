/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
    './templates/**/*.html'
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['monospace'],
          },
    },
  },
  plugins: [],
}

