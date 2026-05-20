/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Wise Brand & Accent
        primary: '#9fe870',
        'primary-hover': '#cdffad',
        'primary-neutral': '#c5edab',
        'primary-pale': '#e2f6d5',

        // Surfaces
        canvas: '#ffffff',
        'canvas-soft': '#e8ebe6',

        // Text
        ink: '#0e0f0c',
        'ink-deep': '#163300',
        body: '#454745',
        mute: '#868685',

        // Semantic
        positive: '#2ead4b',
        'positive-deep': '#054d28',
        warning: '#ffd11a',
        'warning-deep': '#b86700',
        'warning-content': '#4a3b1c',
        negative: '#d03238',
        'negative-deep': '#a72027',
        'negative-darkest': '#a7000d',
        'negative-bg': '#320707',

        // Tertiary accents
        'accent-orange': '#ffc091',
        'accent-cyan': '#38c8ff',
      },
      borderRadius: {
        'none': '0px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'pill': '9999px',
        'full': '9999px',
      },
      spacing: {
        'xxs': '2px',
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(14, 15, 12, 0.05)',
        'elevated': '0 4px 16px rgba(14, 15, 12, 0.08)',
      },
    },
  },
  plugins: [],
}