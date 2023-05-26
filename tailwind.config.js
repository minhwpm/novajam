/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
        }
      },

      animation: {
        pop: 'pop 0.3s ease-out forwards 1',
        fadeIn: 'fadeIn 0.5s ease-in forwards 1',
        slideUp: 'slideUp 0.3s ease-in forwards 1',
        slidingText: 'slidingText 10s linear infinite normal none running',
        expandingWidth: 'expandingWidth 0.5s ease-in-out forwards 1',
        shrinkingWidth: 'shrinkingWidth 0.5s ease-in-out forwards 1',
        poop: 'poop 0.5s ease-in-out forwards 1',
      }
    },
  },
  plugins: [],
}
