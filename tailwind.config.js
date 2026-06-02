/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#121212',
        'luxury-dark': '#1a1a1a',
        'luxury-gold': '#D4AF37',
        'luxury-gold-hover': '#AA8C2C',
        'luxury-silver': '#E5E7EB',
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(212, 175, 55, 0.15)',
        'underglow': '0 10px 40px -10px rgba(212, 175, 55, 0.08)',
      }
    },
  },
  plugins: [],
}