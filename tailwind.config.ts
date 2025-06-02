import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mahogany: {
          50: '#faf8f7',
          100: '#f5f0ee',
          600: '#8b5a47',
          700: '#6b4435',
          DEFAULT: '#351d14',
        },
        smoke: {
          50: '#f8f8f7',
          400: '#c5c5c0',
          700: '#d1d1cc',
        },
        beige: {
          50: '#faf9f8',
          600: '#a59c8a',
          700: '#ccc6b8',
        },
      },
    },
  },
  plugins: [],
};

export default config; 