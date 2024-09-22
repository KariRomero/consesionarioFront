'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import Link from 'next/link';
import { fetchCars } from '@/redux/slices/carsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CarsCard from '../Cars/CarsCard';

const MostSearchedCars: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
        
    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);
    
    const { cars } = useSelector((state: RootState) => state.cars);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(2);

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth < 640) {
                setCardsToShow(1);
            } else {
                setCardsToShow(2);
            }
        };
        resizeHandler();
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const next = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % cars.length
        );
    };

    const prev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + cars.length) % cars.length
        );
    };

    const displayedCards = cars.slice(currentIndex, currentIndex + cardsToShow);
    return (
        <section className="relative w-full mb-10">
            <Link href='/cars'>
                <h1 className="text-center text-3xl font-semibold pb-6">Los más buscados</h1>
                <div className='border border-b-grey border-t-0 border-x-0 flex justify-center items-center mb-8'>
                <button className="text-lg font-semibold px-4 pb-4 hover:underline hover:underline-offset-8">Sedan</button>
                <button className="text-lg font-semibold px-4 pb-4 hover:underline hover:underline-offset-8">Coupe</button>
                <button className="text-lg font-semibold px-4 pb-4 hover:underline hover:underline-offset-8">SUV</button>
                <button className="text-lg font-semibold px-4 pb-4 hover:underline hover:underline-offset-8">Pickup</button>
                <button className="text-lg font-semibold px-4 pb-4 hover:underline hover:underline-offset-8">Hatchback</button>
                </div>
            </Link>
            {cars && cars.length > 0 ? (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-blue px-4 py-2 rounded-full z-10"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className='flex justify-around'>
                        {displayedCards.map((car) => (
                            <CarsCard
                                key={car.id}
                                id={car.id}
                                imageUrl={car.imagenes.map((img) => img.url)}
                                title={`${car.marca} ${car.modelo} - ${car.year}`}
                                subtitle={car.descripcion}
                                kilometraje={car.kilometraje}
                                fuelType={car.combustible}
                                transmission={car.transmision}
                                price={`$${car.precio}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-blue px-4 py-2 rounded-full z-10"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </>
            ) : (
                <p>No hay vehiculos disponibles en este momento.</p>
            )}
        </section>
    )
}

export default MostSearchedCars;