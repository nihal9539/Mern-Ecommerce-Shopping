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
      boxShadow:{
        'boxShadow1':"inset 0 0 0 1.5px white" 
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        "main-blue":"#1A97F5",
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      colors:{
        "main-blue":"#1A97F5",
         "profile-input":"rgb(235, 240, 247)"
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