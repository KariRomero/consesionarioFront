import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faGaugeHigh, faGear, faArrowUpRightFromSquare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from '@/types/types';
import ModalCompartir from '../../Modal/ModalCompartir';
import Carusel from './Carusel';

type CarsCardProps = {
  car: Vehiculo;
};

const CarsCard: React.FC<CarsCardProps> = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const brandName = car?.brand?.nombre ?? 'Sin marca';
  const title = `${brandName} ${car?.modelo ?? ''}`;
  const año = car?.year;
  const subtitle = car.descripcion;
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
  const shareText = `Mirá este auto a la venta en RodAR: ${shareUrl}`;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs mx-auto
    ${destacado ? 'shadow-primary':''}`} 
    style={{ minHeight: '350px' }}>
      {/* Modal compartir */}
      {showModal && (
        <ModalCompartir
          closeModal={closeModal}
          shareText={shareText}
          shareUrl={shareUrl}
        />
      )}

      {/* Imagen principal */}
      <Carusel
        imageList={imageList}
        currentImageIndex={currentImageIndex}
        title={title}
        setShowModal={setShowModal}
        handleNextImage={handleNextImage}
        handlePrevImage={handlePrevImage}
      />

      {/* Contenido */}
      <div className="p-2 sm:p-2">
        <h2 className="w-full text-lg sm:text-xl font-medium mb-2 sm:mb-3">{title}</h2>
        {/* <p className="text-sm sm:text-base mb-4 sm:mb-5">{subtitle}</p> */}
        {/* <hr className="my-2 sm:my-3 opacity-50" /> */}

        <div className='grid grid-cols-2'>
          <div className="flex flex-col items-start justify-between mb-4 sm:mb-5 text-xs sm:text-sm">
            <div >
              <FontAwesomeIcon icon={faGaugeHigh} className="mr-1 sm:mr-2 text-primary" />
              {`${kilometraje} kms`}
            </div>
            <div >
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
};

export default CarsCard;