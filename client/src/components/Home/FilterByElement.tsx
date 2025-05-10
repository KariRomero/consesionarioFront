import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTiposById } from "@/redux/slices/tiposSlice";
import { fetchBrandById } from "@/redux/slices/brandsSlice";
import CarsCard from "@/components/Cars/Card/CarsCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from "@/types/types";

type FilterByElementProps = {
    elementId: string;
    elementType: 'tipo' | 'brand';
};

const FilterByElement = ({
    elementId,
    elementType
}: FilterByElementProps) => {

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (elementId) {
            if (elementType === 'tipo') {
                dispatch(fetchTiposById(elementId));
            }
            if (elementType === 'brand') {
                dispatch(fetchBrandById(elementId));
            }
        }
    }, [elementId, elementType, dispatch]);


    const tipoState = useSelector((state: RootState) => state.tipos);
    const brandState = useSelector((state: RootState) => state.brands);

    const data = elementType === 'tipo' ? tipoState.tipo : brandState.brand;
    const loading = elementType === 'tipo' ? tipoState.loading : brandState.loading;
    const error = elementType === 'tipo' ? tipoState.error : brandState.error;

     let displayedCards: Vehiculo[] = [];

    if (data && Array.isArray(data.vehiculos)) {
        displayedCards = data.vehiculos;
    }




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


    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;


    return (
        <>
            {displayedCards.length > 0 ? (
                <div className="flex flex-wrap gap-2 px-10 py-10 relative justify-start items-start">
                    {displayedCards.map((v: Vehiculo) => (
                        <CarsCard
                            key={v.id}
                            car={v}
                        />
                    ))}


                </div>
            ) : (
                []
            )}
        </>
    );
};


export default FilterByElement;