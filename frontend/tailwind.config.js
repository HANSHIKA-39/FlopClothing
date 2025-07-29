/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-pink": "#f8ada4",
        cream: "#fcf9ed",
        "soft-peach": "#f8d2a4",
        "uted-green": "#5b7f699",
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', "serif"],
      },
    },
  },
  plugins: [],
};
