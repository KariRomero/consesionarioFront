import { useRef, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from '@/types/types';

type ModalZoomProps = {
  car: Vehiculo | null;
  selectedImage: number;
  toggleZoom: () => void;
  handlePrevImage: () => void;
  handleNextImage: () => void;
};

export default function ModalZoom({
  car,
  selectedImage,
  toggleZoom,
  handlePrevImage,
  handleNextImage,
}: ModalZoomProps) {
  const touchStartX = useRef<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setTransitioning(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const currentX = e.targetTouches[0].clientX;
      const deltaX = currentX - touchStartX.current;
      setTranslateX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    setTransitioning(true);
    if (translateX < -minSwipeDistance) {
      setTranslateX(0);
      handleNextImage();
    } else if (translateX > minSwipeDistance) {
      setTranslateX(0);
      handlePrevImage();
    } else {
      setTranslateX(0); // snap back if not enough swipe
    }
    touchStartX.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(50,50,50,0.8)] backdrop-blur-sm">
      {/* Mensaje solo en mobile */}
      <div className="absolute top-20 w-full flex justify-center md:hidden animate-fade-in">
        <p className="text-center text-sm text-gray-200 bg-black/60 px-4 py-1 rounded-full flex items-center justify-center gap-2 shadow">
          <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
          deslizá para ver más
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
        </p>
      </div>

      <div
        className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`transition-transform duration-300 ease-out`}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: transitioning ? 'transform 0.3s ease' : 'none',
          }}
        >
          {car?.imagenes?.[selectedImage]?.url ? (
            <Image
              src={car.imagenes[selectedImage].url}
              alt={car.modelo || 'Imagen del coche'}
              width={800}
              height={600}
              className="object-contain max-h-[90vh] max-w-[90vw] rounded-lg"
            />
          ) : (
            <p className="text-white">No image available</p>
          )}
        </div>

        {/* Cerrar */}
        <button
          onClick={toggleZoom}
          className="absolute top-1 right-4 p-3 text-2xl"
        >
          <FontAwesomeIcon icon={faTimes} className="text-gray-300" />
        </button>

        {/* Flechas desktop */}
        <div className="hidden md:block">
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-4 text-2xl"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-gray-300" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-4 text-2xl"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}