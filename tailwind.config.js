/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edeffc',
          100: '#cbcff6',
          200: '#babff3',
          300: '#979fed',
          400: '#757fe7',
          500: '#525fe1',
          600: '#4a56cb',
          700: '#424cb4',
          800: '#39439e',
          900: '#313987',
          950: '#293071',
        },
        secondary: {
          50: '#fee2cd',
          100: '#fcc59a',
          200: '#fcb781',
          300: '#fa9a4f',
          400: '#f98c35',
          500: '#f86f03',
          600: '#df6403',
          700: '#c65902',
          800: '#ae4e02',
          900: '#954302',
          950: '#7c3802',
        },
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'shadow-all-directions': 'rgba(0, 27, 71, 0.28) 0px 2px 8px 0px'
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/2': '5 / 2',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        pop: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.6)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
            visibility: 'visible',
          },
        },
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
            visibility: 'visible',
          }
        },
        slideUp: {
          '0%': {
            'top': '0'
          },
          '100%': {
            'top': '-75%'
          }
        },
        slidingText: {
          '0%': {
            opacity: 0,
          },
          '5%': {
            opacity: 0,
            transform: 'translateY(-20px)'
          },
          '10%': {
            opacity: 1,
            transform: 'translateY(0px)'
          },
          '25%': {
            opacity: 1,
            transform: 'translateY(0px)'
          },
          '30%': {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          '80%': {
            opacity: 0,
          },
          '100%': {
            opacity: 0,
          },
        },
        expandingWidth: {
          '0%': {
            width: '70%'
          },
          '100%': {
            width: '100%'
          }
        },
        shrinkingWidth: {
          '0%': {
            width: '100%'
          },
          '100%': {
            width: '70%'
          }
        },
        poop: {
          '25%': {
            transform: 'scale(0.95)'
          },
          '60%': {
            transform: 'scale(1.03)'
          },
          '70%': {
            transform: 'scale(1.02)'
          },
          '100%': {
            transform: 'scale(1.05)'
          },
        },
        animationA: {
          '0%': {
            opacity:0,
            transform: 'translateY(30px) scale(0.9)',
          },
          '60%': {
            transform: 'translateY(-2px) scale(0.99)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1.0)',
            visibility: 'visible'
          }
        },
        headerSlideIn: {
          '0%': {
            top: '-100%',
          },
          '100%': {
            top: '0'
          }
        },
      },

      animation: {
        pop: 'pop 0.3s ease-out forwards 1',
        fadeIn: 'fadeIn 0.5s ease-in forwards 1',
        slideUp: 'slideUp 0.3s ease-in forwards 1',
        slidingText: 'slidingText 10s linear infinite normal none running',
        expandingWidth: 'expandingWidth 0.5s ease-in-out forwards 1',
        shrinkingWidth: 'shrinkingWidth 0.5s ease-in-out forwards 1',
        poop: 'poop 0.5s ease-in-out forwards 1',
        animationA: 'animationA 0.5s ease-out forwards 1',
        headerSlideIn: 'headerSlideIn 0.5s ease-out forwards 1',
      }
    },
  },
  plugins: [],
}
