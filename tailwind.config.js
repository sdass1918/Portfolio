/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'mac-spring': 'macSpringIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'blur-in': 'blurIntensify 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.92)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        macSpringIn: {
          '0%': { opacity: 0, transform: 'scale(0.85) translateY(10px)' },
          '50%': { transform: 'scale(1.02) translateY(-2px)' },
          '70%': { transform: 'scale(0.98) translateY(1px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
        blurIntensify: {
          from: { backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' },
          to: { backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' },
        },
      },
    },
  },
  plugins: [],
};
