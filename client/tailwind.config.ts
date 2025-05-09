import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/*.js" // también corregí esto
  ],
  theme: {
    extend: {
      colors: {
        primary: '#184c73', // tu nuevo color
        white: '#f9fafb',
        black: '#030712',
        'gray-1': '#f1f1f1',
      },
    },
  },
  plugins: [nextui()],

  
};

export default config;
