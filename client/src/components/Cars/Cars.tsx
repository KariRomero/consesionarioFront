'use client';

import React, { useState } from 'react';
import FilterBar from '@/components/FilterBar/FilterBar'; 
import CarsCard from '@/components/Cars/CarsCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchCars } from '@/redux/slices/carsSlice';

const Cars: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { cars, loading, error } = useSelector((state: RootState) => state.cars);

  const [filters, setFilters] = useState<{ brand: string; tipo: string; fuelType: string; kilometraje: number; transmision: string }>({
    brand: '',
    tipo: '',
    fuelType: '',
    kilometraje: 0,
    transmision: '',
  });

  const [isFilterVisible, setIsFilterVisible] = useState(false); // Nuevo estado para manejar la visibilidad del menú de filtros

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ brand: '', tipo: '', fuelType: '', kilometraje: 0, transmision: '' });
  };

  React.useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) {
    return <p>Cargado . . . </p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filtrar los autos en base a los filtros seleccionados
  const filteredCars = cars.filter((car) => {
    const matchesBrand = filters.brand ? car.marca === filters.brand : true;
    const matchesTipo = filters.tipo ? car.tipo === filters.tipo : true;
    const matchesFuelType = filters.fuelType ? car.combustible === filters.fuelType : true;
    const machestransmision = filters.transmision ? car.transmision === filters.transmision : true;
    const matchesMileage = filters.kilometraje ? car.kilometraje <= filters.kilometraje : true;
    return matchesBrand && matchesFuelType && matchesMileage && matchesTipo && machestransmision;
  });

  return (
    <section className="p-6 relative">
      <h1 className="text-2xl font-bold mb-4">A nuestros Vehículos</h1>

      {/* Botón para abrir el menú de filtros */}
      <button
        className="mb-4 bg-blue-500 text-blue px-4 py-2 rounded"
        onClick={() => setIsFilterVisible(!isFilterVisible)}
      >
        Filtros
      </button>

      {/* Renderiza el componente de filtros aquí */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
      />

      {/* Ajustar el layout de las tarjetas cuando el menú de filtros esté visible */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${isFilterVisible ? 'ml-64' : ''}`}>
        {filteredCars.map((car) => (
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
    </section>
  );
};

export default Cars;