/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: "#000",
      backgroundImage: {
        sellerImage:
          "url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT6Xh9QdwL3Fbm1RgP5-V9Y_GKlBNISJouaI9KSqbSAQQfjoqEU')",
      },
    },
  },
  plugins: [],
};
