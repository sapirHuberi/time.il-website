/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1E3A8A',
          deep: '#0A192F',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          muted: '#E2E8F0',
        },
        gold: {
          DEFAULT: '#D4AF37',
          bronze: '#C5A880',
        },
        leather: '#8B5A2B',
        charcoal: '#18181B',
      },
      fontFamily: {
        sans: ['Heebo', 'Segoe UI', 'Tahoma', 'sans-serif'],
        display: ['"Frank Ruhl Libre"', 'Georgia', 'serif'],
        script: ['Allura', 'cursive'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.12) translate(0, 0)' },
          '100%': { transform: 'scale(1.22) translate(-1.5%, 1%)' },
        },
        grain: {
          '0%, 100%': { opacity: '0.25', transform: 'translate(0, 0)' },
          '50%': { opacity: '0.4', transform: 'translate(1%, -0.5%)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)', opacity: '0.55' },
          '50%': { transform: 'translateX(-50%) translateY(6px)', opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'second-hand': {
          from: { transform: 'translateX(-50%) translateY(-100%) rotate(0deg)' },
          to: { transform: 'translateX(-50%) translateY(-100%) rotate(360deg)' },
        },
        'draw-line': {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) scale(1)', opacity: '0.35' },
          '50%': { transform: 'rotate(180deg) scale(1.05)', opacity: '0.55' },
          '100%': { transform: 'rotate(360deg) scale(1)', opacity: '0.35' },
        },
        'watch-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'strap-sway': {
          '0%, 100%': { transform: 'rotate(-1.2deg)' },
          '50%': { transform: 'rotate(1.2deg)' },
        },
        'strap-sway-rev': {
          '0%, 100%': { transform: 'rotate(1.2deg)' },
          '50%': { transform: 'rotate(-1.2deg)' },
        },
        'stitch-run': {
          to: { strokeDashoffset: '-32' },
        },
        'second-sweep': {
          to: { transform: 'rotate(360deg)' },
        },
        'crown-pulse': {
          '0%, 100%': { transform: 'translateX(0)', opacity: '1' },
          '50%': { transform: 'translateX(1px)', opacity: '0.85' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'ken-burns': 'ken-burns 28s ease-out forwards',
        grain: 'grain 12s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2.4s ease-in-out infinite',
        'spin-slow': 'spin-slow 48s linear infinite',
        'second-hand': 'second-hand 60s linear infinite',
        'draw-line': 'draw-line 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both',
        orbit: 'orbit 36s linear infinite',
        'watch-float': 'watch-float 5.5s ease-in-out infinite',
        'strap-sway': 'strap-sway 6s ease-in-out infinite',
        'strap-sway-rev': 'strap-sway-rev 6s ease-in-out infinite',
        'stitch-run': 'stitch-run 2.8s linear infinite',
        'second-sweep': 'second-sweep 12s linear infinite',
        'crown-pulse': 'crown-pulse 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
