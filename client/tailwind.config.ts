import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    colors: {
      'white':'#f9fafb',
      'black':'#030712',
      'primary':'#4275f5',
      'gray-1':'#f1f1f1'   
    },
    extend: {},
  },
  plugins: [nextui()],
};
export default config;
