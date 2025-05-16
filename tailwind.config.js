// postcss.config.js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // Or 'tailwindcss': {} if that's what your Tailwind version expects with @tailwindcss/postcss installed
    autoprefixer: {},
  },
};
