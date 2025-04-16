import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Montserrat } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { metadata } from "./metadata";
import ReduxProvider from '../redux/ReduxProvider';
import StateLoader from "@/components/StateLoader/StateLoader";
import MainWrapper from "@/components/Wrappers/MainWrapper";
import Footer from "@/components/Footer/Footer";

config.autoAddCss = false;

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <title>{typeof metadata.title === 'string' ? metadata.title : 'default title'}</title>
        <meta name="description" content={typeof metadata.description === 'string' ? metadata.description : 'undefined content'} />
      </head>
      <body className={`${montserrat.className} text-black `}>
        <ReduxProvider>
          <StateLoader />
          <MainWrapper>
            {children}
          </MainWrapper>
        </ReduxProvider>
        {/* <Footer/> */}
      </body>
    </html>
  );
}