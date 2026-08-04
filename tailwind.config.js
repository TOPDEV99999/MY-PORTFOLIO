/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        'minato': {
          50:  '#eef6ff',
          100: '#d8eaff',
          200: '#b9d9ff',
          300: '#89c0ff',
          400: '#519dff',
          500: '#2878ff',
          600: '#1057f5',
          700: '#0d44e1',
          800: '#1238b6',
          900: '#14338f',
          950: '#0e1f57',
        },
        'glass': 'rgba(255,255,255,0.06)',
        'glass-border': 'rgba(255,255,255,0.12)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'typing': 'typing 1.2s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(40,120,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(40,120,255,0.7)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
