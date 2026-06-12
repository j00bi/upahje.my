/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Green Brand Core — unified around brand green #166345
        primary: '#166345',
        'primary-hover': '#0d3b18',
        'primary-neutral': '#2d8f5e',
        'primary-pale': '#e8f5e0',

        // Green scale — brand anchoring
        'green-deep': '#0a2a12',
        'green-forest': '#0d3b18',
        'green-mid': '#166345',
        'green-soft': '#e8f5e0',

        // Surfaces
        canvas: '#ffffff',
        'canvas-soft': '#f9f9f9',
        'canvas-warm': '#f5f3ee',

        // Text
        ink: '#0e0f0c',
        'ink-deep': '#0a2a12',
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
        'brand-xxs': '2px',
        'brand-xs': '4px',
        'brand-sm': '8px',
        'brand-md': '12px',
        'brand-lg': '16px',
        'brand-xl': '24px',
        'brand-2xl': '32px',
        'brand-3xl': '48px',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-dm-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(14, 15, 12, 0.05)',
        'elevated': '0 4px 16px rgba(14, 15, 12, 0.08)',
        'green-glow': '0 4px 24px rgba(22, 99, 69, 0.25)',
      },
    },
  },
  plugins: [],
}
