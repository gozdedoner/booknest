/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // BookNest Premium Palette
        softWhite: "#F8FAF6", // Arka plan – inci beyazı
        sage: "#919682", // Ana yeşil – başlıklar, butonlar
        softSage: "#C7CDBF", // Açık sage – kartlar, inputlar
        darkOlive: "#595E48", // Koyu yeşil – icon, border
        nude: "#C7A491", // Nude – küçük vurgular
        blush: "#EECFCA", // Blush – tamamlayıcı detay
        champagne: "#DACFB4", // Gold/champagne – hover highlight
      },
      boxShadow: {
        bookSoft: "0 4px 8px rgba(89, 94, 72, 0.15)", // premium shadow
        bookGlow: "0 0 12px rgba(218, 207, 180, 0.45)", // gold glow
      },
      backdropBlur: {
        xs: "2px",
        sm: "6px",
        md: "12px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};
