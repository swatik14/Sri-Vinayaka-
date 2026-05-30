/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        temple: {
          maroon:      '#6B1A1A',
          'maroon-dark': '#4A0F0F',
          'maroon-light': '#8B2020',
          saffron:     '#FF9A00',
          'saffron-dark': '#E08800',
          'saffron-light': '#FFB830',
          gold:        '#D4AF37',
          'gold-dark': '#B8960C',
          'gold-light': '#F0D060',
          cream:       '#FFF8F0',
          'cream-dark': '#F5EDE0',
          brown:       '#2C1A0E',
          'brown-light': '#5C3A1E',
          orange:      '#FF6B35',
          red:         '#CC2200',
        },
      },
      fontFamily: {
        heading: ['Georgia', 'Cambria', 'serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
        decorative: ['Palatino Linotype', 'Book Antiqua', 'Palatino', 'serif'],
      },
      backgroundImage: {
        'temple-gradient': 'linear-gradient(135deg, #6B1A1A 0%, #4A0F0F 50%, #2C1A0E 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)',
        'saffron-gradient': 'linear-gradient(135deg, #FF9A00 0%, #FFB830 50%, #FF6B35 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(107,26,26,0.85) 0%, rgba(44,26,14,0.75) 100%)',
      },
      boxShadow: {
        'temple': '0 4px 20px rgba(107, 26, 26, 0.2)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'saffron': '0 4px 20px rgba(255, 154, 0, 0.3)',
        'card': '0 2px 15px rgba(44, 26, 14, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseGold: { '0%, 100%': { boxShadow: '0 0 5px rgba(212,175,55,0.5)' }, '50%': { boxShadow: '0 0 20px rgba(212,175,55,0.8)' } },
        marquee: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(-100%)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
};
