/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      dropShadow: {
        glass: '0 10px 20px rgba(0,0,0,.08)',
      },
      boxShadow: {
        'glass-inset': 'inset 0 1px rgba(255,255,255,.45), 0 0 0 1px rgba(255,255,255,.18)',
      },
      backdropBlur: {
        glass: '16px',
      },
      saturate: {
        125: '1.25',
        150: '1.5',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        breathe: {
          '0%,100%': { transform: 'scale(0.98)', opacity: '0.8' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        },
      },
      animation: {
        breathe: 'breathe 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}