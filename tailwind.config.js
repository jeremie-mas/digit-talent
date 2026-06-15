/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Navy from logo: #17294D
        primary: {
          50:  '#f0f3f9',
          100: '#d4dcec',
          200: '#a9b9d9',
          300: '#7d96c5',
          400: '#5272b1',
          500: '#2f509e',
          600: '#1f3e7a',
          700: '#17294D',
          800: '#111f3b',
          900: '#0b1529',
          950: '#060c18',
        },
        // Orange from logo: #E8622A
        accent: {
          50:  '#fff4ee',
          100: '#ffe6d3',
          200: '#ffcda8',
          300: '#ffb47c',
          400: '#fe9a51',
          500: '#f57f26',
          600: '#E8622A',
          700: '#c44c1c',
          800: '#9f3915',
          900: '#7a280f',
          950: '#3f1007',
        },
      },
    },
  },
  plugins: [],
};
