module.exports = {
  content: ['./src/**/*.{ejs,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'login-green': '#2A7146',
        'login-green-hover': '#35724df5',
        red: '#562323',
        'red-hover': '#5a3535',
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        inter: ['Inter'],
      },
    },
  },
  plugins: [],
};
