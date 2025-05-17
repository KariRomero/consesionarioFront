import React from 'react';
import Image from "next/image";
import { Vehiculo } from '@/types/types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonsCompartir from '@/components/Buttons/ButtonsCompartir';
import { Toaster } from 'react-hot-toast';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

type ImagenesProps = {
  toggleZoom: () => void;
  car: Vehiculo | null;
  selectedImage: number;
  handleImageSelect: (index: number) => void;
  shareText: string;
  shareUrl: string;
};
export default function Imagenes({
  toggleZoom,
  car,
  selectedImage,
  handleImageSelect,
  shareText,
  shareUrl,
}: ImagenesProps) {
  if (!car) return null;

  return (
    
    <div className="w-full 2xl:w-full flex flex-col items-center   justify-center text-center mb-8  px-2">
      {/* Marca y Modelo centrado arriba */}
      <h2 className="text-3xl 2xl:text-5xl xl:text-4xl 2xl:mb-[3rem]   text-primary font-bold mb-4">
        {car.brand?.nombre} {car.modelo}
      </h2>

      {/* Imagen principal */}
      <div
  onClick={toggleZoom}
  className="relative group cursor-zoom-in rounded-lg shadow-sm overflow-hidden
             w-full max-w-[99vw] aspect-[3/2] 
             sm:max-w-[600px] 
             xl:max-w-[800px] 
             2xl:max-w-[900px]"
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
  


{/* Miniaturas (centradas siempre) */}
<div className="mt-4 w-full flex justify-center">
  <div className="flex flex-wrap justify-center gap-2 max-w-[99vw] sm:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[900px]">
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

{/* Precio + WhatsApp alineados horizontalmente en lg+ */}
<div className="mt-4 w-full 
  max-w-[99vw] 
  sm:max-w-[600px] 
  lg:max-w-[630px] 
  xl:max-w-[800px] 
  2xl:max-w-[900px] 
  mx-auto 
  text-gray-600 text-xl 
   lg:flex 
  lg:justify-between 
  lg:items-center"
>
  {/* Precio alineado a la izquierda */}
  {/* 💻 Desktop: Precio y WhatsApp en el mismo renglón */}
<div className="hidden lg:flex w-full 
  max-w-[99vw] 
  lg:max-w-[630px] 
  xl:max-w-[800px] 
  2xl:max-w-[900px] 
  mx-auto 
  justify-between 
  items-center 
  text-gray-600 
  text-xl mt-4"
>
  {/* Precio */}
  <div className="text-left">
    {car?.vendido === true ? (
      <div className="inline-block px-2 py-1 text-center font-bold bg-primary rounded 
      text-lg lg:text-[1.6rem] lg:leading-[2.25rem] xl:text-3xl 2xl:text-4xl text-white">
        Vendido
      </div>
    ) : (
      <p className="text-lg lg:text-[1.6rem] lg:leading-[2.25rem] xl:text-3xl 2xl:text-4xl text-black font-bold">
        {car?.moneda === 'ARS' ? 'ARS $' : 'USD $'}{" "}
        {new Intl.NumberFormat("es-AR").format(car?.precio || 0)}
      </p>
    )}
  </div>

  {/* Botón WhatsApp */}
  <a
    href={`https://wa.me/5493435263738?text=${encodeURIComponent(
      `Hola RodAR, estoy interesado en el vehículo ${car?.brand?.nombre || ""} ${car?.modelo || ""} que vi en su página. Quisiera más información. https://rodar.ar/cars/${car?.id}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-lg text-green-700 hover:text-green-800"
  >
    <span className="mr-2 font-semibold">WhatsApp</span>
    <FontAwesomeIcon
      icon={faWhatsapp}
      size="lg"
      className="bg-green-700 text-white px-2 py-1.5 rounded-full"
    />
  </a>
</div>
{/* 📱 Mobile: Precio y WhatsApp en el mismo renglón */}
<div className="mt-4 w-full mx-auto px-2 sm:px-0 max-w-[99vw] sm:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[900px] flex justify-between items-center lg:hidden">  {car?.vendido === true ? (
    <div className="inline-block px-2 py-1 text-center text-lg text-white sm:text-xl font-bold bg-primary rounded">
      Vendido
    </div>
  ) : (
    <p className="text-[1.5rem] sm:text-2xl font-bold text-black">
      {car?.moneda === 'ARS' ? 'ARS $' : 'USD $'}{" "}
      {new Intl.NumberFormat("es-AR").format(car?.precio || 0)}
    </p>
  )}

  <a
    href={`https://wa.me/5493435263738?text=${encodeURIComponent(
      `Hola RodAR, estoy interesado en el vehículo ${car?.brand?.nombre || ""} ${car?.modelo || ""} que vi en su página. Quisiera más información. https://rodar.ar/cars/${car?.id}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-sm sm:text-base text-green-700 hover:text-green-800"
  >
    {/* <span className="mr-2 font-semibold">WhatsApp</span> */}
    <FontAwesomeIcon
      icon={faWhatsapp}
      size="lg"
      className="bg-green-700 text-white px-2 py-1.5 rounded-full"
    />
  </a>
</div>
</div>
      
    </div>
  );
}