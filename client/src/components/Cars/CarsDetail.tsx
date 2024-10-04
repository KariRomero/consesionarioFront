'use client'
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState, useCallback } from "react";
import { fetchCarById } from "@/redux/slices/carsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faChevronRight, faChevronLeft, faGaugeHigh, faGasPump, faGear, faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from "../Footer/Footer";
import Brand from "@/types/brand";
import Brands from "../Home/Brands/Brands";

const CarsDetail = () => {
  const params = useParams();
  const id = params?.id;

  const dispatch:AppDispatch = useDispatch();
  const { car, loading, error } = useSelector((state: RootState) => state.cars);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(Number(id)));
      console.log(car);      
    }
  }, [dispatch, id]);

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setIsImageLoading(true);
  };

  const handleNextImage = useCallback(() => {
    if (!car || !car.imagenes) return;
    setSelectedImage((prevIndex) => (prevIndex === car.imagenes.length - 1 ? 0 : prevIndex + 1));
  }, [car]);

  const handlePrevImage = useCallback(() => {
    if (!car || !car.imagenes) return;
    setSelectedImage((prevIndex) => (prevIndex === 0 ? car.imagenes.length - 1 : prevIndex - 1));
  }, [car]);

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

    if (isZoomed) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed, handleNextImage, handlePrevImage]);

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p>Error loading car details: {error}</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <section className="w-full bg-white mt-96 pt-28">
      <div className="flex flex-col lg:flex-row">
        {/* Contenedor de la imagen principal */}
        <div className="lg:w-1/2 flex flex-col items-center">
          <div
            className="w-full mb-4 relative cursor-zoom-in"
            onClick={toggleZoom}
            style={{ width: '600px', height: '470px' }}
          >
            {car?.imagenes?.[selectedImage]?.url ? (
              <Image
                src={car.imagenes[selectedImage].url}
                alt={car.modelo || 'Imagen del coche'}
                width={600}
                height={470}
                className="rounded-lg object-cover w-full h-full"
              />
            ) : (
              <p>No image available</p>
            )}
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
          <div className="flex overflow-x-auto space-x-4">
            {car?.imagenes?.map((img, index) => (
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
          <h2 className="text-3xl font-bold mb-5">{`${car?.brand?.nombre || ''} ${car?.modelo || ''}`}</h2>
          <p className="text-gray-600 font-bold mb-4 flex items-center text-xl">{`${car?.year || 'N/A'}`}</p>
          <p className="font-bold mb-6 flex items-center text-xl">{`$ ${car?.precio || 'N/A'}`}</p>

          <div className="flex items-center space-x-8 mb-6">
            <div className="flex items-center text-xl">
              <FontAwesomeIcon icon={faGaugeHigh} className="mr-3 text-2xl" />
              {`${car?.kilometraje || 'N/A'} KM`}
            </div>
            <div className="flex items-center text-xl">
              <FontAwesomeIcon icon={faGasPump} className="mr-3 text-2xl" />
              {car?.combustible || 'N/A'}
            </div>
            <div className="flex items-center text-xl">
              <FontAwesomeIcon icon={faGear} className="mr-3 text-2xl" />
              {car?.transmision || 'N/A'}
            </div>
          </div>

          {/* Información de la Concesionaria */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Información del vehículo</h3>
            <p className="text-gray-700">{car?.descripcion || 'No hay descripción disponible'}</p>
          </div>
        </div>
      </div>

      {/* Modal de Zoom */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(50,50,50,0.8)] backdrop-blur-sm">
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            {isImageLoading && <div className="loader">Loading...</div>}
            {car?.imagenes?.[selectedImage]?.url ? (
              <Image
                src={car.imagenes[selectedImage].url}
                alt={car.modelo || 'Imagen del coche'}
                width={800}
                height={600}
                className="object-contain max-h-[90vh] max-w-[90vw] rounded-lg"
                onLoadingComplete={() => setIsImageLoading(false)}
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
      )}
      {/* <Brands/> */}
      <Footer/>
    </section>
  );
};

export default CarsDetail;