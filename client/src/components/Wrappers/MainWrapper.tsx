'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NavBar from '@/components/NavBar/NavBar';
import Loader from '../Loader/Loader';

export default function MainWrapper({ children }: { children: React.ReactNode }) {

  const { loading } = useSelector((state: RootState) => state.cars);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Muestra el Loader solo cuando loading de cars sea true */}
      {loading ? (
        <Loader />
      ) : (
        <NavBar />
      )}

      {/* Contenido principal */}
      <div className="w-full px-4 sm:px-6 md:px-8 bg-white mt-28">
        {children}
      </div>
    </div>
  );
}
