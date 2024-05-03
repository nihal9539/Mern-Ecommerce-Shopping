/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      animation: {
        "loop-scroll": "loop-scroll 30s linear infinite"
      },
      keyframes: {
        "loop-scroll": {
          from: {
            transform: "translateX(0)"
          },
          to: {
            transform: "translateX(-100%)"
          }
        }
      }
    },
  },
  plugins: [
    require('daisyui'),

  ],
  daisyui: {
    themes: [

    ],
  },
}

// winter