import React from 'react';
import Image from "next/image";
import { Vehiculo } from '@/types/types';

type ImagenesProps = {
  toggleZoom: () => void;
  car: Vehiculo | null;
  selectedImage: number;
  handleImageSelect: (index: number) => void;
};

export default function Imagenes({
  toggleZoom,
  car,
  selectedImage,
  handleImageSelect,
}: ImagenesProps) {
  if (!car) return null;

  return (
    <div className="w-full 2xl:w-full flex flex-col items-center   justify-center text-center mb-8 px-2">
      {/* Marca y Modelo centrado arriba */}
      <h2 className="text-3xl 2xl:text-5xl 2xl:mb-[3rem]  text-primary font-bold mb-4">
        {car.brand?.nombre} {car.modelo}
      </h2>

      {/* Imagen principal */}
      <div
        onClick={toggleZoom}
        className="relative cursor-zoom-in rounded-lg shadow-sm overflow-hidden"
        style={{ width: '900px', height: '600px' }}
      >
        {car.imagenes?.[selectedImage]?.url ? (
          <Image
            src={car.imagenes[selectedImage].url}
            alt={car.modelo || 'Imagen del coche'}
            width={900}
            height={600}
            className="object-cover w-full h-full"
          />
        ) : (
          <p>No hay imágenes disponibles</p>
        )}
      </div>

      {/* Miniaturas centradas */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {car.imagenes?.map((img, index) => (
          <button
            key={index}
            onClick={() => handleImageSelect(index)}
            className={`border rounded overflow-hidden ${
              selectedImage === index ? 'border-primary border-2' : 'border-gray-300'
            }`}
          >
            <img
              src={img.url}
              alt={`Imagen ${index}`}
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}