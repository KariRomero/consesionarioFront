'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchCars } from '@/redux/slices/carsSlice';
import CarsCard from './CarsCard';

const Cars: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cars, loading, error } = useSelector((state: RootState) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">This is Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarsCard
            key={car.id}
            imageUrl={car.imagenes.map((image) => image.url)} 
            title={`${car.marca} ${car.modelo} - ${car.year}`}
            subtitle={car.descripcion}
            mileage={`${car.kilometraje} KM`}
            fuelType={car.combustible}
            transmission={car.transmision}
            price={`$${car.precio}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Cars;