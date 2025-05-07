'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Imagenes } from '@/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

type CaruselProps = {
  imageList: Imagenes[];
  title: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function Carusel({
  imageList,
  title,
  setShowModal,
}: CaruselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageList.length - 1 : prev - 1
    );

  const handleNextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === imageList.length - 1 ? 0 : prev + 1
    );

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 6000); // autoplay cada 6s
    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <div className="relative w-full h-48 sm:h-48 overflow-hidden p-2">
      <div className="relative w-full h-full">
        {imageList.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={`${title} ${i + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-md transition-opacity duration-1000 ease-in-out ${
              i === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="absolute top-3 right-3 rounded-full bg-gray-1 text-primary text-xl sm:text-2xl hover:shadow-lg transition z-20"
      >
        <FontAwesomeIcon icon={faPaperPlane} size="2xs" className="px-2" />
      </button>

      {imageList.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-sm p-1 rounded-full z-20"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-sm p-1 rounded-full z-20"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}
    </div>
  );
}