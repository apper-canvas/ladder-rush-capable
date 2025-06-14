/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        surface: '#FFFFFF',
        background: '#F7FFF7',
        success: '#06D6A0',
        warning: '#FFD166',
        error: '#EF476F',
        info: '#118AB2'
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 0.6s ease-in-out',
        'roll': 'roll 1s ease-out',
        'hop': 'hop 0.5s ease-out',
        'slide-down': 'slide-down 1s ease-in-out',
        'climb-up': 'climb-up 1s ease-in-out',
        'confetti': 'confetti 2s ease-out infinite'
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'roll': {
          '0%': { transform: 'rotateX(0) rotateY(0)' },
          '25%': { transform: 'rotateX(90deg) rotateY(90deg)' },
          '50%': { transform: 'rotateX(180deg) rotateY(180deg)' },
          '75%': { transform: 'rotateX(270deg) rotateY(270deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' }
        },
        'hop': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.1)' },
          '100%': { transform: 'translateY(0) scale(1)' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px) scale(0.9)' },
          '100%': { transform: 'translateY(0) scale(1)' }
        },
        'climb-up': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px) scale(1.1)' },
          '100%': { transform: 'translateY(0) scale(1)' }
        },
        'confetti': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' }
        }
      }
    }
  },
  plugins: [],
}