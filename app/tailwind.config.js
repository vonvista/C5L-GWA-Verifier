module.exports = {
  content: ['./src/**/*.{ejs,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'baybayin': "url('/assets/icons/baybayin.png')",
      },
      colors: {
        'login-green': '#2A7146',
        'login-green-hover': '#35724df5',
        'primary-red': '#371010',
        'secondary-red': '#562323',
        'red-hover': '#5a3535',
        'sidebar-text': '#e5e5e5',
        'page-background': '#f5f6f8',
        'highlight': '#fff384',
        'table-hover-color': '#fffded',
        'sr-dark-gray': '#e5e5e5',
        'sr-text-gray': '#969696',
        'sr-tab-inactive': '#334D6E',
        'sr-divider-light': '#f0f0f0',
        'sr-disabled-green': '#80BE99',
        'sr-table-name': '#424242',
        'sr-dark-text': '#2f2f2f'
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        inter: ['Inter'],
      },
      gridTemplateColumns:{
        '38/62': '38% 62%'
      },
      scale: {
        '25':'0.25',
        '60': '0.60',
      },
      screens: {
        '1.5xl': '1366px',
        '1.75xl': '1512px',
        '3xl': '1728px',
        '4xl': '1920px',
      },      
      spacing: {
        '5.5': '1.35rem',
      }
    },
  },
  plugins: [],
};