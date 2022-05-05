const colors = require('tailwindcss/colors');

module.exports = {
  // content: [],
  purge: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      ...colors,
    }
  },
};
