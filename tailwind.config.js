/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["roboto"],
        over: ["over"],
        over_b: ["over-bold"],
        GGothicssi40g: ["GGothicssi40g", "sans-serif"],
        GGothicssi20g: ["GGothicssi20g", "sans-serif"],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};
