import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Montserrat } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import { metadata } from "./metadata";
import ReduxProvider from "../redux/ReduxProvider";
import StateLoader from "@/components/StateLoader/StateLoader";
import MainWrapper from "@/components/Wrappers/MainWrapper";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <title>
          {typeof metadata.title === "string"
            ? metadata.title
            : "default title"}
        </title>
        <meta
          name="description"
          content={
            typeof metadata.description === "string"
              ? metadata.description
              : "undefined content"
          }
        />
      </head>
      <body className={`${montserrat.className} text-black`}>
        <ReduxProvider>
          <StateLoader />
          <MainWrapper>{children}</MainWrapper>
        </ReduxProvider>
        <Toaster position="top-center" />
        {/* <Footer /> */}
      </body>
    </html>
  );
}