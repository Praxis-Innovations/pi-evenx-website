import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-plus-jakarta-sans)',
          'Plus Jakarta Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'xl': '0 16px 40px rgba(0, 0, 0, 0.16)',
        'primary-sm': '0 4px 14px rgba(99, 102, 241, 0.25)',
        'primary-md': '0 8px 24px rgba(99, 102, 241, 0.35)',
        'primary-lg': '0 16px 40px rgba(99, 102, 241, 0.45)',
        'phone': '0 24px 48px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'nav': '0 10px 30px rgba(15, 23, 42, 0.08)',
        'card': '0 12px 30px rgba(15, 23, 42, 0.12)',
        'card-hover': '0 20px 40px rgba(15, 23, 42, 0.16)',
        'hero-card': '0 24px 48px rgba(15, 23, 42, 0.18)',
        'glow': '0 0 60px rgba(99, 102, 241, 0.3)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
        '2xl': '28px',
        '3xl': '36px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-primary-hover': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        'gradient-hero': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'gradient-footer': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      },
      animation: {
        'float-slow': 'floatCard1 4.5s ease-in-out infinite',
        'float-medium': 'floatCard2 5s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'spin-slow': 'spin 1s linear infinite',
      },
      keyframes: {
        floatCard1: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatCard2: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      maxWidth: {
        'site': '1120px',
      },
    },
  },
  plugins: [],
};

export default config;
