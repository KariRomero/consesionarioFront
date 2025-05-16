import React from 'react';
import Image from "next/image";
import { Vehiculo } from '@/types/types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <h2 className="text-3xl 2xl:text-5xl xl:text-4xl 2xl:mb-[3rem]  text-primary font-bold mb-4">
        {car.brand?.nombre} {car.modelo}
      </h2>

      {/* Imagen principal */}
      <div
  onClick={toggleZoom}
  className="relative group cursor-zoom-in rounded-lg shadow-sm overflow-hidden
             w-[700px] h-[460px] xl:w-[800px] xl:h-[520px] 2xl:w-[900px] 2xl:h-[600px]"
>
  {car.imagenes?.[selectedImage]?.url ? (
    <>
      <Image
        src={car.imagenes[selectedImage].url}
        alt={car.modelo || 'Imagen del coche'}
        fill
        className="object-cover rounded-lg"
      />
      {/* Lupa visible en hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FontAwesomeIcon icon={faSearch} className="text-white text-4xl" />
      </div>
    </>
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