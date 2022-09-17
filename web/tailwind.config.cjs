/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Os arquivos de conteudo esperado pelo Tailwind
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {

      fontFamily:{
        sans: ['Inter', 'sans-serif']
      },

      backgroundImage:{
        galaxy: "url('./background-galaxy.png')", // Imagem fundo página Web
        'nlw-gradient':'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        'game-gradient':'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
    },
  },
  plugins: [],
}
