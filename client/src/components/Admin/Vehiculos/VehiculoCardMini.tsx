'use client';

import React, { useState } from 'react';
import { Vehiculo } from '@/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faGasPump, faGaugeHigh, faGear } from '@fortawesome/free-solid-svg-icons';

interface Props {
  vehiculo: Vehiculo;
}

const VehiculoCardMini: React.FC<Props> = ({ vehiculo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrl = vehiculo.imagenes?.map((img) => img.url) || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrl.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === imageUrl.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative rounded-lg shadow-md overflow-hidden w-full max-w-xs bg-white transition-all">
      {vehiculo.vendido && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-20 pointer-events-none" />
      )}

      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={imageUrl[currentImageIndex] || '/no-image.jpg'}
          alt={vehiculo.modelo}
          className="w-full h-full object-cover"
        />
        {imageUrl.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white p-1"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white p-1"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold">
          {vehiculo.brand?.nombre || 'Sin marca'} {vehiculo.modelo} - {vehiculo.year}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{vehiculo.descripcion}</p>
        <div className="flex justify-between text-xs mt-2 text-gray-700">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faGaugeHigh} />
            {vehiculo.kilometraje} KM
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faGasPump} />
            {vehiculo.combustible || 'N/A'}
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faGear} />
            {vehiculo.transmision || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiculoCardMini;