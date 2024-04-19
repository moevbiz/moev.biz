/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg",],
  theme: {
    fontFamily: {
      'sans': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    fontSize: {
      sm: ['12px', '15px'],
      base: ['14px', '19px'],
      lg: ['25px', '29px'],
      xl: ['42px', '45px'],
    },
    extend: {},
  },
  plugins: [],
}

