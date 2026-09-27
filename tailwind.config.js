export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand:        '#3C6FD4',
        'brand-dark': '#2B4EAA',
        lime:         '#7BC62D',
        'lime-dark':  '#5fa01e',
        sky:          '#4FC3E5',
        ink:          '#1a1f2e',   // texto principal
        'ink-soft':   '#4a5568',   // texto secundário
        surface:      '#f8faff',   // fundo da página
        'surface-alt':'#eef3fc',   // seção alternada
        card:         '#ffffff',
        border:       '#e8eef8',
      },
      fontFamily: {
        sans:    ['Nunito', 'Arial', 'sans-serif'],
        display: ['Nunito', 'Arial', 'sans-serif'],
      },
      keyframes: {
        revealUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'reveal-up': 'revealUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        float:       'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
