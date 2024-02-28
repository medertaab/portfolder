/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        "870": "870px",
      },
      colors: {
        textPrimary: 'rgb(var(--color-text-primary) / <alpha-value>)',
        textAccent: 'rgb(var(--color-text-accent) / <alpha-value>)',
        bgPrimary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
        bgSecondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        bgAccent: 'rgb(var(--color-bg-accent) / <alpha-value>)',
        primaryLight: 'rgb(var(--color-primary-light) / <alpha-value>)',
        primaryDark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        golden: 'rgb(var(--color-golden) / <alpha-value>)',
        purple: 'rgb(var(--color-purple) / <alpha-value>)',
      },
      animation: {
        'spin-slow': 'spin 1.3s linear infinite',
      }
    },
    fontFamily: {
      'basic': ['system-ui']
     }
  },
  plugins: [],
  darkMode: 'class'
}
