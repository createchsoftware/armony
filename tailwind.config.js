/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      customFont: ['"AbeatbyKai"', "sans-serif"],
      customFont: ['"ILoveGlitter"', "sans-serif"],
      customFont: ['"Quinger"', "sans-serif"],
      backgroundImage: {
        
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
        'flowers': "url('./public/pictures.flowers.png')"
      }
    }},
  },
  plugins: [],
}

