module.exports = {
  content: ['./src/**/*.{ejs,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'login-green': '#2A7146',
        'login-green-hover': '#35724df5',
        red: '#562323',
        'primary-red': '#371010',
        'secondary-red': '#562323',
        'red-hover': '#5a3535',
        'sidebar-text': '#fffded',
        'page-background': '#f5f6f8',
        'highlight': '#fff384',
        'table-hover-color': '#cfd6a9',
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        inter: ['Inter'],
      },
      backgroundImage: {
        'baybayin': "url('/assets/icons/baybayin.png')",
      },
      screens: {
        '1.5xl': '1366px',
        '3xl': '1728px',
        'qhd':'2560px'
      }
    },
  },
  plugins: [],
};