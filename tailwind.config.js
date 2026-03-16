/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['var(--font-galmuri)', 'monospace'],
        body: ['var(--font-mona)', 'monospace'],
      },
    },
  },
  plugins: [],
}
