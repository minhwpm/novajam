/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    perspective: {
      '2500': '2500px'
    },
    extend: {
      fontFamily: {
        'heading': 'var(--font-heading)',
      },
      fontSize: {
        'smd': [
          '0.9375rem', {
            lineHeight: '1.375rem'
          }
        ],
        'heading': 'var(--heading-font-size)',
        'hero-heading': 'var(--hero-heading-font-size)',
        'super-heading': 'var(--super-heading-font-size)',
      },
      colors: {
        primary: {
          50: 'rgb(var(--primary-color-50), <alpha-value>)',
          100: 'rgb(var(--primary-color-100), <alpha-value>)',
          200: 'rgb(var(--primary-color-200), <alpha-value>)',
          300: 'rgb(var(--primary-color-300), <alpha-value>)',
          400: 'rgb(var(--primary-color-400), <alpha-value>)',
          500: 'rgb(var(--primary-color-500), <alpha-value>)',
          600: 'rgb(var(--primary-color-600), <alpha-value>)',
          700: 'rgb(var(--primary-color-700), <alpha-value>)',
          800: 'rgb(var(--primary-color-800), <alpha-value>)',
          900: 'rgb(var(--primary-color-900), <alpha-value>)',
          950: 'rgb(var(--primary-color-950), <alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--secondary-color-50), <alpha-value>)',
          100: 'rgb(var(--secondary-color-100), <alpha-value>)',
          200: 'rgb(var(--secondary-color-200), <alpha-value>)',
          300: 'rgb(var(--secondary-color-300), <alpha-value>)',
          400: 'rgb(var(--secondary-color-400), <alpha-value>)',
          500: 'rgb(var(--secondary-color-500), <alpha-value>)',
          600: 'rgb(var(--secondary-color-600), <alpha-value>)',
          700: 'rgb(var(--secondary-color-700), <alpha-value>)',
          800: 'rgb(var(--secondary-color-800), <alpha-value>)',
          900: 'rgb(var(--secondary-color-900), <alpha-value>)',
          950: 'rgb(var(--secondary-color-950), <alpha-value>)',
        },
      },
      borderRadius: {
        'theme': 'var(--border-radius-theme)',
        'theme-button': 'var(--border-radius-theme-button)',
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'radiant': 'rgba(0, 27, 71, 0.1) .5px .5px 10px .5px'
      },
      spacing: {
        '18': '72px',
      },
      lineHeight: {
        'tighter': '1.1',
        'tight': '1.2',
        'normal': '1.3',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
            visibility: 'visible',
          }
        },
        fadeInSlideLeft: {
          '0%': {
            opacity: 0,
            right: "-6rem",
          },
          '100%': {
            opacity: 1,
            right: 0,
          },
        },
        slidingSubmenu: {
          '0%': {
            'top': 'calc(100% - 1rem)',
            opacity: 0,
          },
          '100%': {
            'top': '100%',
            opacity: 1,
          }
        },
        slidingLinkgroup: {
          '0%': {
            'top': 0,
            opacity: 0,
          },
          '100%': {
            'top': "-1rem",
            opacity: 1,
          }
        },
        slidingHeroContent: {
          '0%': {
            transform: "translateX(-2.5rem)",
            opacity: 0
          },
          '100%': {
            transform: "translateX(0)",
            opacity: 1
          }
        },
        slidingUpContent: {
          '0%': {
            opacity: 0,
            bottom: '-50px'
          },
          '100%': {
            opacity: 1,
            bottom: 0
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
        navMenu_enterFromRight: {
          'from': {
            opacity: 0,
            transform: 'translateX(200px)',
          },
          'to': {
            opacity: 1,
            transform: 'translateX(0)',
          }
        },
        navMenu_enterFromLeft: {
          'from': {
            opacity: 0,
            transform: 'translateX(-200px)',
          },
          'to': {
            opacity: 1,
            transform: 'translateX(0)',
          }
        },
        navMenu_exitToRight: {
          'from': {
            opacity: 1,
            transform: 'translateX(0)',
          },
          'to': {
            opacity: 0,
            transform: 'translateX(200px)',
          }
        },
        navMenu_exitToLeft: {
          'from': {
            opacity: 1,
            transform: 'translateX(0)',
          },
          'to': {
            opacity: 0,
            transform: 'translateX(-200px)',
          }
        },
        accordionSlideUp: {
          'from': {
            height: "var(--radix-accordion-content-height)"
          },
          'to': {
            height: 0
          }
        },
        accordionSlideDown: {
          'from': {
            height: 0
          },
          'to': {
            height: "var(--radix-accordion-content-height)"
          }
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        fadeInSlideLeft: 'fadeInSlideLeft 0.5s ease-in-out forwards',
        slidingSubmenu: 'slidingSubmenu 0.3s ease-out forwards',
        slidingLinkgroup: 'slidingLinkgroup 0.3s ease-out forwards',
        slidingHeroContent: 'slidingHeroContent 1s ease forwards',
        slidingUpContent: 'slidingUpContent 0.5s ease-out forwards',
        headerSlideIn: 'headerSlideIn 0.5s ease-out forwards',
        accordionSlideUp: 'accordionSlideUp 0.3s ease-in-out',
        accordionSlideDown: 'accordionSlideDown 0.3s ease-in-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-3d'),
    require("tailwindcss-animation-delay"),
  ],
}
