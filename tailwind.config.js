// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'pet-pulse': '#9FDCFF',
        'pet-border': '#feebc5',
        'pet-gold': '#d18d05',
        'pet-dark': '#4A6572',
        'pet-gray': '#7E8D96',
      },
      fontFamily: {
        'roboto': ['Roboto'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '14px',
        '3xl': '30px',
      },
    },
  },
  plugins: [],
}