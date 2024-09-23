import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCars } from "@/redux/slices/carsSlice";
import CarsCard from "./CarsCard";
import FilterBar from "../FilterBar/FilterBar";

interface Brand {
  id: number;
  nombre: string;
  ImageBrand: string;
}

interface Tipo {
  id: number;
  nombre: string;
  ImageTipo: string;
}

interface Car {
  id: number;
  brand: Brand;
  tipo: Tipo;
  combustible: string;
  kilometraje: number;
  transmision: string;
  year: number;
  precio: number;
  imagenes: Array<{ url: string }>;
  descripcion: string;
}


const Cars = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [filters, setFilters] = useState<{
    brand: Brand | null;
    tipo: Tipo | null;
    fuelType: string;
    kilometraje: number;
    transmision: string;
  }>({
    brand: null,
    tipo: null,
    fuelType: '',
    kilometraje: 0,
    transmision: '',
  });

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const { cars } = useSelector((state: RootState) => state.cars);
  console.log(cars);
  

  const handleFilterChange = (key: string, value: string | number | Brand | Tipo | null) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ brand: null, tipo: null, fuelType: '', kilometraje: 0, transmision: '' });
  };

  // Filter the cars based on selected filters
  const filteredCars = cars.filter((car: Car) => {
    const matchesBrand = filters.brand ? car.brand?.nombre === filters.brand?.nombre : true;
    const matchesTipo = filters.tipo ? car.tipo?.nombre === filters.tipo?.nombre : true;
    const matchesFuelType = filters.fuelType ? car.combustible === filters.fuelType : true;
    const matchesTransmision = filters.transmision ? car.transmision === filters.transmision : true;
    const matchesMileage = filters.kilometraje ? car.kilometraje <= filters.kilometraje : true;
    return matchesBrand && matchesFuelType && matchesMileage && matchesTipo && matchesTransmision;
  });

  return (
    <section className="pt-28">
      <h1 className="text-center text-3xl font-semibold pb-8">Nuestros vehículos</h1>
      <button
        className="mb-4 bg-blue-500 text-blue px-4 py-2 rounded"
        onClick={() => setIsFilterVisible(!isFilterVisible)}
      >
        Filtros
      </button>
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
      />
      <div className={`grid grid-cols-1 px-6 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${isFilterVisible ? 'ml-64' : ''}`}>
        {filteredCars.map((v: Car) => (
          <CarsCard
            key={v.id}
            id={v.id}
            imageUrl={v.imagenes?.map((img) => img.url)}
            title={`${v.brand?.nombre || "Sin marca"} ${v.modelo} - ${v.year}`}
            subtitle={v.descripcion}
            kilometraje={v.kilometraje}
            fuelType={v.combustible}
            transmission={v.transmision}
            price={`$${v.precio}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Cars;
