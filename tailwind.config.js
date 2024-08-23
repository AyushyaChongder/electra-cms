/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'orange': '#FF6B2B',
      'white': '#ffffff',
      'black': '#000000',
      'orangetext':'#F1761D',
      'bluetext':'#1A86E0',
      'blacktext': '#262626',
      'greybtn': '#F2F2F2',
      'darkgreytext':'#444444',
      'lightgreybg': '#FAFAFA',
      'featureblue': '#1468A1'
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
}

