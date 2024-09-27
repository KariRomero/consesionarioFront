'use client'
import NavBar from "@/components/NavBar/NavBar";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ReduxProvider from '../redux/ReduxProvider';
import { usePathname } from 'next/navigation';
import { metadata } from "./metadata";

config.autoAddCss = false;

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 
  return (
    <html lang="en">
      <head>
        <title>{typeof metadata.title === 'string' ? metadata.title : 'default title'}</title>
        <meta name="description" content={typeof metadata.description === 'string' ? metadata.description : 'undefined content'} />
        {/* Otras etiquetas de meta que desees agregar */}
      </head>
      <body className={`${montserrat.className} bg-white text-black`}>
        <ReduxProvider>
          {!pathname.startsWith('/admin') && <NavBar />}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
