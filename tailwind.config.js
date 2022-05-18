module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      mobile: '-webkit-fill-available',
      screen: '100vh',
    }),

    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
