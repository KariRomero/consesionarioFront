import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGasPump,
  faGaugeHigh,
  faGear,
  faArrowUpRightFromSquare,
  faChevronRight,
  faChevronLeft,
  faShareNodes,
  faXmark,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faFacebookMessenger,
} from '@fortawesome/free-brands-svg-icons';
import { Vehiculo } from '@/types/types';

type CarsCardProps = {
  car: Vehiculo;
};

const CarsCard: React.FC<CarsCardProps> = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const brandName = car?.brand?.nombre ?? 'Sin marca';
  const title = `${brandName} ${car?.modelo ?? ''} - ${car?.year ?? ''}`;
  const subtitle = car.descripcion;
  const kilometraje = car.kilometraje || 0;
  const fuelType = car.combustible || 'Sin especificar';
  const transmission = car.transmision || 'Sin especificar';
  const price = `$${car.precio}`;
  const imageList = car.imagenes ?? [];

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
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto" style={{ minHeight: '400px' }}>
      {/* Modal compartir */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-black p-4 sm:p-6 rounded-lg shadow-xl w-[90%] max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-gray-300 text-lg sm:text-xl"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-center text-white">Compartir este auto</h3>
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')}
                className="w-full bg-green-500 text-white px-3 py-2 rounded text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
                WhatsApp
              </button>

              <button
                onClick={() => window.open(`https://www.messenger.com/share?link=${encodeURIComponent(shareUrl)}&app_id=123456789`, '_blank')}
                className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faFacebookMessenger} />
                Messenger
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Enlace copiado al portapapeles');
                }}
                className="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faCopy} />
                Copiar enlace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Imagen principal */}
      <div className="relative w-full h-48 sm:h-64 overflow-hidden">
        <img src={imageList[currentImageIndex]?.url} alt={title} className="w-full h-full object-cover" />
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-2 right-2 text-black text-xl sm:text-2xl p-2 sm:p-3 hover:bg-blue-700 hover:text-primary transition z-10"
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </button>

        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-sm p-1 rounded-full"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-sm p-1 rounded-full"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h2>
        <p className="text-sm sm:text-base mb-4 sm:mb-5">{subtitle}</p>
        <hr className="my-2 sm:my-3 opacity-50" />

        <div className="flex items-center justify-between mb-4 sm:mb-5 text-xs sm:text-sm space-x-2 sm:space-x-3">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGaugeHigh} className="mr-1 sm:mr-2" />
            {`${kilometraje} KM`}
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGasPump} className="mr-1 sm:mr-2" />
            {fuelType}
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGear} className="mr-1 sm:mr-2" />
            {transmission}
          </div>
        </div>

        <hr className="my-2 sm:my-3 opacity-50" />
        <div className="flex items-center justify-between mt-3 sm:mt-4">
          <p className="text-lg sm:text-xl font-bold">{price}</p>
          <Link href={`/cars/${car.id}`}>
            <button className="text-blue text-sm sm:text-base font-semibold hover:underline ml-2 flex items-center">
              Ver detalles
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 sm:ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarsCard;