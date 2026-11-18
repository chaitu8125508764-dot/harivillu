/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        harivillu: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        rani: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        zari: {
          light: '#fde68a',
          DEFAULT: '#d4af37',
          dark: '#b48a1c',
          metallic: 'linear-gradient(135deg, #FFE082 0%, #D4AF37 50%, #996515 100%)'
        },
        peacock: {
          light: '#0ea5e9',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
          deep: '#083344'
        },
        emerald: {
          deep: '#064e3b',
          rich: '#047857'
        },
        temple: {
          crimson: '#881337',
          maroon: '#4c0519'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['"Cinzel Decorative"', '"Playfair Display"', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      }
    },
  },
  plugins: [],
}
