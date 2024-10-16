/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#3B81F6', //blue
        secondary: '#9333EA',
        blackColor: "black",
        backGround : "gray",
        teretory:"#FFFF",
        headerColor:"#F7FAFC", // header gray color
        accent: '#FFB300',
        danger: '#FF0000',
       
      },
      spacing: {
        // Define custom spacing
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        // Define custom fonts
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 1s infinite 200ms',
        'bounce-slower': 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [],
}