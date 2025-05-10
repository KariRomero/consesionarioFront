import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGasPump,
  faGaugeHigh,
  faGear,
  faArrowUpRightFromSquare,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from '@/types/types';
import ModalCompartir from '../../Modal/ModalCompartir';
import Carusel from './Carusel';
import FireBorderWrapper from '@/components/Home/destacados/FireBorderWrapper';

type CarsCardProps = {
  car: Vehiculo;
  destacado?: boolean;
};

const CarsCard: React.FC<CarsCardProps> = ({ car, destacado }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const brandName = car?.brand?.nombre ?? 'Sin marca';
  const title = `${brandName} ${car?.modelo ?? ''}`;
  const kilometraje = car.kilometraje || 0;
  const fuelType = car.combustible || 'Sin especificar';
  const transmission = car.transmision || 'Sin especificar';
  const price = car.precio;
  const imageList = car.imagenes ?? [];
  const moneda = car.moneda === 'ARS' ? 'ARS' : 'USD'
  const destacado = car.destacado || false;

  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(`${window.location.origin}/cars/${car.id}`);
  }, [car.id]);

  const closeModal = () => setShowModal(false);

  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs mx-auto
    ${destacado ? 'shadow-primary':''}`} 
    style={{ minHeight: '350px' }}>
      {/* Modal compartir */}
      {showModal && (
        <ModalCompartir
          closeModal={closeModal}
          shareText={`Mirá este auto a la venta en RodAR: ${shareUrl}`}
          shareUrl={shareUrl}
        />
      )}

      <Carusel imageList={imageList} title={title} setShowModal={setShowModal} />

      <div className="p-2 sm:p-2">
        <h2 className="w-full text-lg sm:text-xl font-medium mb-2 sm:mb-3">{title}</h2>

        <div className="grid grid-cols-2">
          <div className="flex flex-col items-start justify-between mb-4 sm:mb-5 text-xs sm:text-sm">
            <div>
              <FontAwesomeIcon icon={faGaugeHigh} className="mr-1 sm:mr-2 text-primary" />
              {`${kilometraje} kms`}
            </div>
            <div>
              <FontAwesomeIcon icon={faGasPump} className="mr-1 sm:mr-2 text-primary" />
              {fuelType}
            </div>
            <div>
              <FontAwesomeIcon icon={faGear} className="mr-1 sm:mr-2 text-primary" />
              {transmission}
            </div>
          </div>
          <div className="flex flex-col">
            {car.vendido ? (
              <div className="inline-block px-2 py-1 text-center text-lg text-white sm:text-xl font-bold bg-primary rounded">
                Vendido
              </div>              
            ) : (
              <p className="text-lg sm:text-xl font-bold">{moneda} {price}</p>
            )}
            <Link href={`/cars/${car.id}`}>
              <button className="text-primary text-sm sm:text-sm font-medium hover:underline">
                Ver detalles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return destacado ? (
    <FireBorderWrapper className="w-full">{Content}</FireBorderWrapper>
  ) : (
    Content
  );
};

export default CarsCard;