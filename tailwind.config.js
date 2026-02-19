/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#e50914',
        'netflix-dark': '#111',
        'netflix-gray': '#141414',
      },
      backgroundImage: {
        'gradient-overlay':
          'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), rgba(0,0,0,0.9))',
      },
    },
  },
  plugins: [],
}

