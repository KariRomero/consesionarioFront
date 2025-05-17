import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from '@/types/types';

type ModalZoomProps = {
  car: Vehiculo | null;
  initialImage: number; // usamos un índice inicial
  toggleZoom: () => void;
};

export default function ModalZoom({
  car,
  initialImage,
  toggleZoom,
}: ModalZoomProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImage);
  const touchStartX = useRef<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return; // ⛔️ NO hacer nada si es pinch
    touchStartX.current = e.targetTouches[0].clientX;
    setTransitioning(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return; // ⛔️ evitar swipe si es pinch
    if (touchStartX.current !== null) {
      const currentX = e.targetTouches[0].clientX;
      const deltaX = currentX - touchStartX.current;
      setTranslateX(deltaX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length > 1) return; // ⛔️ no cerrar swipe si fue multitouch
    setTransitioning(true);
    if (translateX < -minSwipeDistance) {
      handleNextImage();
    } else if (translateX > minSwipeDistance) {
      handlePrevImage();
    }
    setTranslateX(0);
    touchStartX.current = null;
  };

  const handleNextImage = () => {
    const imagenes = car?.imagenes;
    if (!imagenes || imagenes.length === 0) return;
    setSlideDirection('left');
    setCurrentImageIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrevImage = () => {
    const imagenes = car?.imagenes;
    if (!imagenes || imagenes.length === 0) return;
    setSlideDirection('right');
    setCurrentImageIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggleZoom();
      else if (event.key === 'ArrowRight') handleNextImage();
      else if (event.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [car]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
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
  className={`transition-transform duration-500 ease-in-out ${
    slideDirection === 'left' ? 'animate-slide-left' :
    slideDirection === 'right' ? 'animate-slide-right' : ''
  }`}
  onAnimationEnd={() => setSlideDirection(null)}
  style={{
    transform: `translateX(${translateX}px)`,
    transition: transitioning ? 'transform 0.3s ease' : 'none',
  }}
>
          {car?.imagenes?.[currentImageIndex]?.url ? (
            <Image
              src={car.imagenes[currentImageIndex].url}
              alt={car.modelo || 'Imagen del coche'}
              width={800}
              height={600}
              className="object-contain max-h-[90vh] max-w-[90vw] rounded-lg"
            />
          ) : (
            <p className="text-white">No image available</p>
          )}
        </div>

        {/* Botón cerrar */}
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