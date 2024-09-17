'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faGaugeHigh, faGear, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { fetchCars } from '../../redux/slices/carsSlice';

const CarDetail: React.FC = () => {
  const params = useParams(); 
  const id = params?.id; 
  const router = useRouter(); 

  const dispatch = useAppDispatch(); 
  const { cars, loading, error } = useAppSelector((state: RootState) => state.cars); 
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const carData = cars.find((car) => car.id === Number(id));

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setIsImageLoading(true);
  };

  const handleNextImage = useCallback(() => {
    if (!carData) return;
    setSelectedImage((prevIndex) => (prevIndex === carData.imagenes.length - 1 ? 0 : prevIndex + 1));
  }, [carData]);

  const handlePrevImage = useCallback(() => {
    if (!carData) return;
    setSelectedImage((prevIndex) => (prevIndex === 0 ? carData.imagenes.length - 1 : prevIndex - 1));
  }, [carData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      } else if (event.key === 'ArrowRight') {
        handleNextImage();
      } else if (event.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    // Agregar event listener para cuando el modal de zoom está abierto
    if (isZoomed) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    // Agregar event listener para navegación de imágenes fuera del modal de zoom
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed, handleNextImage, handlePrevImage]);

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p>Error loading car details: {error}</p>;
  if (!carData) return <p>Car not found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 mb-4">
        <button onClick={() => router.push('/cars')} className="hover:underline">Volver</button> | 
        <a href="#" className="hover:underline"> {carData.marca} </a> | {carData.modelo}
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Contenedor de la imagen principal */}
        <div className="lg:w-1/2 flex flex-col items-center">
          <div
            className="w-full mb-4 relative cursor-zoom-in"
            onClick={toggleZoom}
            style={{ width: '600px', height: '470px' }}
          >
            {/* Imagen principal ajustada */}
            <Image
              src={carData.imagenes[selectedImage].url}
              alt={carData.modelo}
              width={600}
              height={470}
              className="rounded-lg object-cover w-full h-full"
            />
            {/* Botones de Navegación */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-4 text-2xl bg-gray-800 text-white rounded-full"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-4 text-2xl bg-gray-800 text-white rounded-full"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Miniaturas de imágenes */}
          <div className="flex overflow-x-auto space-x-4"> {/* Espacio uniforme entre miniaturas */}
            {carData.imagenes.map((img, index) => (
              <button key={index} onClick={() => handleImageSelect(index)}>
                <img
                  src={img.url}
                  alt={`Image ${index}`}
                  className={`w-20 h-20 object-cover rounded ${selectedImage === index ? 'border-2 ' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información Detallada del Vehículo */}
        <div className="lg:w-1/2 lg:pl-8">
          <h2 className="text-3xl font-bold mb-5">{`${carData.marca} ${carData.modelo}`}</h2>
          <p className="text-gray-600 font-bold mb-4 flex items-center text-xl">{`${carData.year}`}</p>
          <p className=" font-bold mb-6 flex items-center text-xl">{`$ ${carData.precio}`}</p>

          <div className="flex items-center space-x-8 mb-6">
            <div className="flex items-center text-xl">
              <FontAwesomeIcon icon={faGaugeHigh} className="mr-3 text-2xl" />
              {`${carData.kilometraje} KM`}
            </div>
            <div className="flex items-center text-xl">
              <FontAwesomeIcon icon={faGasPump} className="mr-3 text-2xl" />
              {carData.combustible}
            </div>
            <div className="flex items-center text-xl">
              <FontAwesomeIcon icon={faGear} className="mr-3 text-2xl" />
              {carData.transmision}
            </div>
          </div>

          {/* Información de la Concesionaria */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Información del vehiculo</h3>
            <p className="text-gray-700">{carData.descripcion}</p>
          </div>
        </div>
      </div>

      {/* Modal de Zoom */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(50,50,50,0.8)] backdrop-blur-sm">
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            {isImageLoading && <div className="loader">Loading...</div>}
            <Image
              src={carData.imagenes[selectedImage].url}
              alt={carData.modelo}
              width={800}
              height={600}
              className="object-contain max-h-[90vh] max-w-[90vw] rounded-lg"
              onLoadingComplete={() => setIsImageLoading(false)}
            />
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
      )}
    </div>
  );
};

export default CarDetail;