/** @type {import('tailwindcss').Config} */

module.exports = {
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
        'assets': 'var(--border-radius-assets)',
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
        'tight': '1.2',
        'normal': '1.3',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/2': '5 / 2',
        '9/8': '9 / 8',
        '16/9': '16 / 9',
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
        slidingLeft: {
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
        slidingUpSection: {
          '0%': {
            opacity: 0,
            bottom: '-40px'
          },
          '100%': {
            opacity: 1,
            bottom: 0
          }
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
        navMenu_scaleIn: {
          'from': {
            opacity: 0,
            transform: 'rotateX(-30deg) scale(0.9)',
          },
          'to': {
            opacity: 1,
            transform: 'rotateX(0deg) scale(1)',
          }
        },
        navMenu_scaleOut: {
          'from': {
            opacity: 1,
            transform: 'rotateX(0deg) scale(1)',
          },
          'to': {
            opacity: 0,
            transform: 'rotateX(-10deg) scale(0.95)',
          }
        },
        navMenu_fadeIn: {
          'from': {
            opacity: 0,
          },
          'to': {
            opacity: 1,
          }
        },
        navMenu_fadeOut: {
          'from': {
            opacity: 1,
          },
          'to': {
            opacity: 0,
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
        // @TODO check/refactor animation
        pop: 'pop 0.3s ease-out forwards 1',
        fadeIn: 'fadeIn 0.5s ease-in forwards 1',
        slidingLeft: 'slidingLeft 0.5s ease-in-out forwards 1',
        slidingSubmenu: 'slidingSubmenu 0.3s ease-out forwards 1',
        slidingLinkgroup: 'slidingLinkgroup 0.3s ease-out forwards 1',
        slidingHeroContent: 'slidingHeroContent 1s ease forwards',
        slidingUpSection: 'slidingUpSection 0.5s ease-in-out forwards',
        slidingText: 'slidingText 10s linear infinite normal none running',
        expandingWidth: 'expandingWidth 0.5s ease-in-out forwards 1',
        shrinkingWidth: 'shrinkingWidth 0.5s ease-in-out forwards 1',
        poop: 'poop 0.5s ease-in-out forwards 1',
        animationA: 'animationA 0.5s ease-out forwards 1',
        headerSlideIn: 'headerSlideIn 0.5s ease-out forwards 1',
        navMenu_scaleIn: 'navMenu_scaleIn 0.2s ease',
        navMenu_scaleOut: 'navMenu_scaleOut 0.2s ease',
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
