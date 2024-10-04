'use client'
import SideBar from "@/components/NavBar/SideBar";
import ReduxProvider from "@/redux/ReduxProvider";
import { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <div className={`${montserrat.className} bg-white text-black`}>
      <ReduxProvider>
        <SideBar isVisible={isSidebarVisible} toggleVisibility={() => setIsSidebarVisible(!isSidebarVisible)} />
        <main className={`transition-all duration-300 ${isSidebarVisible ? "ml-64" : "ml-0"}`}>
          {children}
        </main>
      </ReduxProvider>
    </div>
  );
}
