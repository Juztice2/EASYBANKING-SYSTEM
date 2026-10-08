/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        merriweather: ['Merriweather', 'serif'],
        oswald: ['Oswald', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        work: ['Work Sans', 'sans-serif'],
        source: ['Source Sans 3', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
      },
       keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0) rotate(-8deg)",
          },

          "50%": {
            transform: "translateY(-15px) rotate(-8deg)",
          },
        },
      },

      animation: {
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}