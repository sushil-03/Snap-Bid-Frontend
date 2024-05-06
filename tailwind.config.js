/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xxs: "0.5rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      md: "1.08rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      backdropBlur: {
        "4xl": "50px",
      },
      screens: {
        xxs: "350px",
        xs: "500px",
      },
      margin: ["last"],
      boxShadow: {
        "3xl": "0 9px 20px rgba(13,38,76,0.19)",
      },
      colors: {
        brand: {},
        blue: {
          100: "#ebf8ff",
          200: "#bee3f8",
          300: "#90cdf4",
          400: "#63b3ed",
          500: "#4299e1",
          600: "#3182ce",
          700: "#2b6cb0",
          800: "#2c5282",
          900: "#2a4365",
        },
        black: {
          100: "#2c2c2c",
          200: "#242124",
          300: "#222021",
          400: "#1f1f1f",
          500: "#171717",
          600: "#121212",
          700: "#0D0D0D",
          800: "#010203",
          900: "#000000",
        },
      },
      fontFamily: {
        piru: ["Pirulen"],
        bai: ["Bai Jamjuree", "sans-serif"],
        orbitron: ["Orbitron"],
        OrbitronMedium: ["OrbitronMedium"],
        baibold: ["BaiBold"],
        baiMedium: ["BaiMedium"],
        baiLight: ["BaiLight"],
      },
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
