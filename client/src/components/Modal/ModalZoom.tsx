import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from '@/types/types';

type ModalZoomProps ={
    // isImageLoading:boolean;
    car: Vehiculo | null;
    selectedImage:number;
    // setIsImageLoading:Dispatch<SetStateAction<boolean>>;
    toggleZoom:()=>void;
    handlePrevImage: () => void;
    handleNextImage: () => void;
}

export default function ModalZoom({
    // isImageLoading,
    car,
    selectedImage,
    // setIsImageLoading,
    toggleZoom,
    handlePrevImage,
    handleNextImage
}:ModalZoomProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(50,50,50,0.8)] backdrop-blur-sm">
              <div className="relative max-w-full max-h-full flex items-center justify-center">
                {/* {isImageLoading && <div className="loader">Loading...</div>} */}
                {car?.imagenes?.[selectedImage]?.url ? (
                  <Image
                    src={car.imagenes[selectedImage].url}
                    alt={car.modelo || 'Imagen del coche'}
                    width={800}
                    height={600}
                    className="object-contain max-h-[90vh] max-w-[90vw] rounded-lg"
                    // onLoadingComplete={() => setIsImageLoading(false)}
                  />
                ) : (
                  <p>No image available</p>
                )}
                {/* Botón de Cierre */}
                <button
                  onClick={toggleZoom}
                  className="absolute top-1 right-4 p-3 text-2xl"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-grey" />
                </button>
                {/* Botones de Navegación */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-4 text-2xl"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-grey" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-4 text-2xl"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-grey" />
                </button>
              </div>
            </div>
  )
}
