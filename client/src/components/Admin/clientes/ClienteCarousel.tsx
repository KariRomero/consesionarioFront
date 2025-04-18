'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ClienteCarouselProps {
  imagenes: string[];
}

const ClienteCarousel: React.FC<ClienteCarouselProps> = ({ imagenes }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % imagenes.length);
  const prev = () => setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);

  useEffect(() => {
    const interval = setInterval(next, 6000); // ✅ cada 6 segundos
    return () => clearInterval(interval);
  }, [imagenes.length]);

  if (imagenes.length === 0) return null;

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-md shadow">
      <div
        className="w-full h-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          display: 'flex',
        }}
      >
        {imagenes.map((img, i) => (
          <div key={i} className="relative w-full h-48 flex-shrink-0">
            <Image
              src={img}
              alt={`Imagen ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2  bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 z-10"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 z-10"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default ClienteCarousel;