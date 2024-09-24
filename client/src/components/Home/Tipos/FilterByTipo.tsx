import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTiposById } from "@/redux/slices/tiposSlice";
import CarsCard from "@/components/Cars/CarsCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FilterByTipo: React.FC<{ tipoId: number }> = ({ tipoId }) => {
    const dispatch: AppDispatch = useDispatch();
    const { tipo, loading, error } = useSelector((state: RootState) => state.tipos);

    useEffect(() => {
        if (tipoId > 0) {
            dispatch(fetchTiposById(tipoId));
        }
    }, [tipoId, dispatch]);

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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (tipo?.vehiculos?.length || 1));
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (tipo?.vehiculos?.length || 1)) % (tipo?.vehiculos?.length || 1));
    };

    const displayedCards = tipo?.vehiculos?.slice(currentIndex, currentIndex + cardsToShow) || [];    

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {displayedCards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 px-10 py-10 relative">
                    <button onClick={prev} className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-blue px-4 py-2 rounded-full z-10">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {displayedCards.map((v) => (
                        <CarsCard
                            key={v.id}
                            id={v.id}
                            imageUrl={v.imagenes?.map(img => img.url)}
                            title={`${v.brand?.nombre || 'Sin marca'} ${v.modelo} - ${v.year}`}
                            subtitle={v.descripcion}
                            kilometraje={v.kilometraje || 0}
                            fuelType={v.combustible || 'Sin especificar'}
                            transmission={v.transmision || 'Sin especificar'}
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

export default FilterByTipo;
