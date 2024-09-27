import SideBar from "@/components/NavBar/SideBar";
import ReduxProvider from "@/redux/ReduxProvider";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${montserrat.className} bg-white text-black`}>
      <ReduxProvider>
        <SideBar />
        <main>{children}</main>
      </ReduxProvider>
    </div>
  );
}
