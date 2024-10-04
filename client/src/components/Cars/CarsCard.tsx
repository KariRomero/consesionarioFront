import React, { useState } from 'react';
import Link from 'next/link'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faGaugeHigh, faGear, faArrowUpRightFromSquare , faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'; 

interface CarsCardProps {
  imageUrl?: string[]; 
  title: string;
  subtitle: string;
  kilometraje: number;  
  fuelType: string;
  transmission: string;
  price: string;
  id: number; 
}

const CarsCard: React.FC<CarsCardProps> = ({
  imageUrl = [], 
  title,
  subtitle,
  kilometraje,
  fuelType,
  transmission,
  price,
  id,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageUrl.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imageUrl.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto" style={{ minHeight: '400px' }}>
    
    <div className="relative w-full h-64 overflow-hidden"> 
      <img src={imageUrl[currentImageIndex]} alt={title} className="w-full h-full object-cover" /> 
      
        
        {imageUrl.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white p-1 rounded-full" 
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white p-1 rounded-full"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>

     
      <div className="p-5"> 
        <h2 className="text-xl font-bold mb-3">{title}</h2> 
        <p className="mb-5">{subtitle}</p> 
        <hr className="my-3 opacity-50" /> 
        <div className="flex items-center justify-between mb-5 text-sm space-x-3">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGaugeHigh} className="mr-2" />
            {`${kilometraje} KM`}
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGasPump} className="mr-2" />
            {fuelType}
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGear} className="mr-2" />
            {transmission}
          </div>
        </div>
        <hr className="my-3 opacity-50" /> 
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold">{price}</p>
          <Link href={`/cars/${id}`}> {/* Usar Link de Next.js con la ruta dinámica */}
            <button className="text-blue font-semibold hover:underline ml-2 flex items-center">
              View Details
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" /> {/* Ícono al lado del texto */}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarsCard;
