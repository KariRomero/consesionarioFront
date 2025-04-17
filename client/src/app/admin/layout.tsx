'use client';

import SideBar from "@/components/NavBar/SideBar";
import ReduxProvider from "@/redux/ReduxProvider";
import CustomNextUIProvider from "@/components/providers/NextUIProvider";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import AppInitializer from "@/components/Admin/AppInitializer";
import LogoutButton from "@/components/Admin/utilities/LogoutButton";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const pathname = usePathname();
  const hideSidebar = pathname === "/admin/login";

  return (
    <div className={`${montserrat.className} bg-white text-black`}>
      <ReduxProvider>
        <CustomNextUIProvider>
          <AppInitializer />

          <Toaster position="top-center" />

          {!hideSidebar && (
            <SideBar
              isVisible={isSidebarVisible}
              toggleVisibility={() => setIsSidebarVisible(!isSidebarVisible)}
            />
          )}

          <main
            className={`transition-all duration-300 ${
              !hideSidebar && isSidebarVisible ? "ml-64" : "ml-0"
            }`}
          >
            {children}
          </main>
        </CustomNextUIProvider>
      </ReduxProvider>
    </div>
  );
}