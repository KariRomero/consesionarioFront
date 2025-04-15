'use client'
import { usePathname } from 'next/navigation';
import NavBar from '@/components/NavBar/NavBar';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showNavBar = !pathname.startsWith('/admin');

  return (
    <>
      {showNavBar && <NavBar />}
      {children}
    </>
  );
}
