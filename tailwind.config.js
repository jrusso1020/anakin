/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mirage: "#17252A",
        paradiso: "#2B7A78",
        keppel: "#3AAFA9",
        swansDown: "#DEF2F1",
        twilightBlue: "#FEFFFF",
      },
      boxShadow: {
        "swans-down": "0 1px 0 0 #DCEDEA",
        keppel: "0 1px 0 0 #3AAFA9",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["hover"],
      boxShadow: ["hover"],
    },
  },
  plugins: [],
}
