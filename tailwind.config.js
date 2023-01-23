/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        textPrimary: 'rgb(var(--color-text-primary) / <alpha-value>)',
        textAccent: 'rgb(var(--color-text-accent) / <alpha-value>)',
        bgPrimary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
        bgSecondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        bgAccent: 'rgb(var(--color-bg-accent) / <alpha-value>)',
      }

    },
  },
  plugins: [],
  darkMode: 'class'
}
