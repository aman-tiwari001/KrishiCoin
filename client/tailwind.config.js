import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme': '#283e2f'
      }
    },
  },
  plugins: [
    daisyui,
    typography, // Adding the typography plugin here
  ],
};
