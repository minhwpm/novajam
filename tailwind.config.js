/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: 'var(--container-horizontal-padding)',
    },
    perspective: {
      2500: '2500px',
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading)',
      },
      fontSize: {
        smd: [
          '0.9375rem',
          {
            lineHeight: '1.375rem',
          },
        ],
        'sm-heading': 'var(--sm-heading-font-size)',
        'base-heading': 'var(--base-heading-font-size)',
        'lg-heading': 'var(--lg-heading-font-size)',
        'xl-heading': 'var(--xl-heading-font-size)',
        '2xl-heading': 'var(--2xl-heading-font-size)',
      },
      colors: {
        primary: {
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
        theme: 'var(--border-radius-theme)',
        'theme-button': 'var(--border-radius-theme-button)',
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        radiant: 'rgba(0, 27, 71, 0.1) .5px .5px 10px .5px',
      },
      spacing: {
        1.25: '0.3125rem',
        2.5: '0.625rem',
        4.5: '1.125rem',
        7.5: '1.875rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        18: '4.5rem',
        19.5: '4.875rem',
        26: '6.5rem',
        39: '9.75rem',
        42: '10.5rem',
        63: '15.75rem',
      },
      lineHeight: {
        tighter: '1.1',
        tight: '1.2',
        normal: '1.3',
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
          },
        },
        fadeInSlideLeft: {
          '0%': {
            opacity: 0,
            right: '-6rem',
          },
          '100%': {
            opacity: 1,
            right: 0,
          },
        },
        slidingSubmenu: {
          '0%': {
            top: 'calc(100% - 1rem)',
            opacity: 0,
          },
          '100%': {
            top: '100%',
            opacity: 1,
          },
        },
        slidingLinkgroup: {
          '0%': {
            top: 0,
            opacity: 0,
          },
          '100%': {
            top: '-1rem',
            opacity: 1,
          },
        },
        slidingUpContent: {
          from: {
            transform: 'translateY(40px)',
            opacity: 0,
          },
          to: {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        headerSlideIn: {
          '0%': {
            top: '-100%',
          },
          '100%': {
            top: '0',
          },
        },
        navMenu_enterFromRight: {
          from: {
            opacity: 0,
            transform: 'translateX(200px)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        navMenu_enterFromLeft: {
          from: {
            opacity: 0,
            transform: 'translateX(-200px)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        navMenu_exitToRight: {
          from: {
            opacity: 1,
            transform: 'translateX(0)',
          },
          to: {
            opacity: 0,
            transform: 'translateX(200px)',
          },
        },
        navMenu_exitToLeft: {
          from: {
            opacity: 1,
            transform: 'translateX(0)',
          },
          to: {
            opacity: 0,
            transform: 'translateX(-200px)',
          },
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        fadeInSlideLeft: 'fadeInSlideLeft 0.5s ease-in-out forwards',
        slidingSubmenu: 'slidingSubmenu 0.3s ease-out forwards',
        slidingLinkgroup: 'slidingLinkgroup 0.3s ease-out forwards',
        slidingUpContent: 'slidingUpContent 1s ease both',
        headerSlideIn: 'headerSlideIn 0.5s ease-out forwards',
      },
    },
  },
  safelist: [
    { pattern: /(pt|pb|pr|pl|gap)-(\d+)/, variants: ['md', 'lg'] },
    {
      pattern:
        /text-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-500/,
      variants: ['dark'], // Include dark mode variants if needed
    },
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-3d'),
    require('tailwindcss-animation-delay'),
    plugin(function ({ addVariant }) {
      addVariant('inverse', '.inverse &');
    }),
  ],
};
