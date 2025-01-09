import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
        "dark-blue" : "#633CFF",
        "purple" : "#BEADFF",
        "light-purple" : "#EFEBFF",
        "black" : "#333333",
        "dark-grey" : "#737373",
        "light-grey" : "#D9D9D9",
        "milk" : "#FAFAF8",
        "white" : "#FFFFFF",
        "red" : "#FF3939",
      },
      fontFamily: {
        instrumentsans: ["Instrument Sans", "sans-serif"]
      },
    },
    screens: {
      xs: "30rem",
      sm: "48rem",
      md: "58rem"
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
};
export default config;
 