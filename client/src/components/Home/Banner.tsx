'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Vehiculo {
  id: string;
  modelo: string;
  year: number;
  imagenes: { url: string }[];
}

const Banner: React.FC = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const res = await axios.get(`${prod_url}/vehiculos?limit=1000`);
        const destacados = res.data.vehiculos.filter(
          (v: any) => v.destacado && v.publicado && v.imagenes?.length > 0
        );
        setVehiculos(destacados);
      } catch (error) {
        console.error('Error cargando vehículos destacados', error);
      }
    };

    fetchDestacados();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (vehiculos.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full  lg:mt-[2rem] mt-[1rem] py-10">
         <h1 className="text-center text-3xl font-bold pb-4 text-primary">
      Vehículos destacados
    </h1>

      {isMobile && vehiculos.length > 1 && (
        <p className="text-center text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
          deslizá para ver más
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
        </p>
      )}

      <div
        ref={scrollRef}
        className={`flex ${
          isMobile && vehiculos.length > 1
            ? 'overflow-x-auto scrollbar-hide space-x-4'
            : 'flex-wrap justify-center gap-4'
        }`}
      >
        {vehiculos.map((vehiculo) => {
          const imgUrl = vehiculo.imagenes[0]?.url;
          return (
            <div
              key={vehiculo.id}
              onClick={() => router.push(`/cars/${vehiculo.id}`)}
              className={`relative cursor-pointer overflow-hidden rounded-lg group ${
                isMobile ? 'min-w-[90%]' : 'w-[calc(20%-1rem)]'
              }`}
            >
              <img
                src={imgUrl}
                alt={`${vehiculo.modelo} ${vehiculo.year}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold drop-shadow">
                  {vehiculo.modelo} {vehiculo.year}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;