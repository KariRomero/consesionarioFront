'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NavBar from '@/components/NavBar/NavBar';
import Loader from '../Loader/Loader';
import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useSelector((state: RootState) => state.cars);
  const pathname = usePathname();

  // ❗ Oculta la NavBar en /admin excepto en /admin/login
  const hideNavBar = pathname.startsWith('/admin') && pathname !== '/admin/login';

  return (
    <div className="w-full min-h-screen flex flex-col">
      {loading ? (
        <Loader />
      ) : (
        !hideNavBar && <NavBar />
      )}

      <div className={`w-full px-0 sm:px-0 md:px-0 bg-white ${!hideNavBar ? 'mt-28' : ''}`}>
        {children}
      </div>
    </div>
  );
}