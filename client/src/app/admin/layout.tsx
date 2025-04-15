'use client';

import SideBar from "@/components/NavBar/SideBar";
import ReduxProvider from "@/redux/ReduxProvider";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import AppInitializer from "@/components/Admin/AppInitializer";
import LogoutButton from "@/components/Admin/utilities/LogoutButton";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const pathname = usePathname();

  // Ocultar sidebar solo en /admin/login
  const hideSidebar = pathname === "/admin/login";

  return (
    <div className={`${montserrat.className} bg-white text-black`}>
      <ReduxProvider>
        <AppInitializer /> {/* 🔄 Sincroniza Redux con localStorage */}
        
        {!hideSidebar && (
          <SideBar
            isVisible={isSidebarVisible}
            toggleVisibility={() => setIsSidebarVisible(!isSidebarVisible)}
          />
        )}

        <main className={`transition-all duration-300 ${!hideSidebar && isSidebarVisible ? "ml-64" : "ml-0"}`}>
          {children}
        </main>
      </ReduxProvider>
    </div>
  );
}