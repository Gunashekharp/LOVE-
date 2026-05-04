import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B0B0F',
        ember: '#F5C77E',
        rose: '#F5A3B7',
        lavender: '#B9A7FF',
      },
      fontFamily: {
        serif: ['var(--font-playfair)'],
        sans: ['var(--font-inter)'],
        script: ['var(--font-great-vibes)'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(245, 199, 126, 0.25)',
        rose: '0 0 80px rgba(245, 163, 183, 0.22)',
      },
    },
  },
  plugins: [],
};

export default config;
