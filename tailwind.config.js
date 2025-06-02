/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mahogany': {
          50: '#fdf4f2',
          100: '#fbe9e4',
          200: '#f5d3c9',
          300: '#eeb5a5',
          400: '#e48f77',
          500: '#d86f52',
          600: '#c4553a',
          700: '#a3422f',
          800: '#86382a',
          900: '#6f3126',
        },
        'smoke': {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        'beige': {
          50: '#faf6f1',
          100: '#f5ede3',
          200: '#ead9c7',
          300: '#dfc5ab',
          400: '#d4b18f',
          500: '#c99d73',
          600: '#b58959',
          700: '#946e47',
          800: '#77593b',
          900: '#614a32',
        },
      },
    },
  },
  plugins: [],
} 