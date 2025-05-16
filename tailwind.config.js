// tailwind.config.js - NEW ES Module way
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Example paths, adjust to your project
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add other paths as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
