import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // On garde une couleur de base au cas où
        primary: "#00008B",
        secondary: "#010101",
        teritiary: "#2f5c97",
        grey: "#727475",
        light: "#ffffff",
      },
      // Surcharge des utilitaires pour utiliser le dégradé
      backgroundImage: {
        'primary': 'linear-gradient(to right, #00008B, #000023)',
      },
      textColor: {
        'primary': 'transparent',
      },
      borderColor: {
        'primary': 'linear-gradient(to right, #00008B, #000023)',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents }) {
      // Plugin pour les textes avec dégradé
      addUtilities({
        '.text-primary': {
          background: 'linear-gradient(to right, #00008B, #000023)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          color: 'transparent',
        },
      });
      
      // Plugin pour les bordures avec dégradé
      addUtilities({
        '.border-primary': {
          position: 'relative',
          'border': 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            padding: '2px',
            background: 'linear-gradient(to right, #00008B, #000023)',
            '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            '-webkit-mask-composite': 'xor',
            'mask-composite': 'exclude',
            pointerEvents: 'none',
            borderRadius: 'inherit',
          }
        }
      });
    }
  ],
};
export default config;