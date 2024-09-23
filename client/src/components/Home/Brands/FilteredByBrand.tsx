import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandById } from "@/redux/slices/brandsSlice";
import CarsCard from "@/components/Cars/CarsCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Vehiculo {
    id: number;
    modelo: string;
    year: number;
    descripcion: string;
    precio: number;
    transmision: string;
    combustible: string;
    kilometraje: number;
    imagenes: { url: string }[];
    tipoId: number;
    brandId: number;
    createdAt: string;
    updatedAt: string;
}

const FilteredByBrand: React.FC<{ brandId: number }> = ({ brandId }) => {
    const dispatch: AppDispatch = useDispatch();
    const { brand, loading, error } = useSelector((state: RootState) => state.brands);
    
    useEffect(() => {
        dispatch(fetchBrandById(brandId));
    }, [brandId, dispatch]);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4);

    useEffect(() => {
        const resizeHandler = () => {
            setCardsToShow(window.innerWidth < 640 ? 1 : 4);
        };
        resizeHandler();
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (brand?.vehiculos?.length || 1));
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (brand?.vehiculos?.length || 1)) % (brand?.vehiculos?.length || 1));
    };

    const displayedCards = brand?.vehiculos?.slice(currentIndex, currentIndex + cardsToShow) || [];

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;   

    return (
        <div>
            {displayedCards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 px-10 py-10 relative">
                    <button onClick={prev} className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-blue px-4 py-2 rounded-full z-10">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {displayedCards.map((v: Vehiculo) => (
                        <CarsCard
                            key={v.id}
                            id={v.id}
                            imageUrl={v.imagenes?.map(img => img.url)} 
                            title={`${brand?.nombre} ${v.modelo} - ${v.year}`}
                            subtitle={v.descripcion}
                            kilometraje={v.kilometraje}
                            fuelType={v.combustible}
                            transmission={v.transmision}
                            price={`$${v.precio}`}
                        />
                    ))}
                    <button onClick={next} className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-blue px-4 py-2 rounded-full z-10">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            ) : (
                []
            )}
        </div>
    );
};

export default FilteredByBrand;
