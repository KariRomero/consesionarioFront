import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCars } from "@/redux/slices/carsSlice";
import CarsCard from "./CarsCard";
import FilterBar from "../FilterBar/FilterBar";
import { Vehiculo } from "@/types/vehiculo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CarsPagination from "./CarsPagination";
import Footer from "../Footer/Footer";

const Cars = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [filters, setFilters] = useState<{
    transmision?: string;
    combustible?: string;
    minKilometraje?: number;
    maxKilometraje?: number;
    minPrecio?: number;
    maxPrecio?: number;
    tipoId?: number;
    brandId?: number;
  }>({
    transmision: undefined,
    combustible: undefined,
    minKilometraje: undefined,
    maxKilometraje: undefined,
    minPrecio: undefined,
    maxPrecio: undefined,
    tipoId: undefined,
    brandId: undefined,
  });
  

  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [dispatch, filters]);

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  

  const resetFilters = () => {
    setFilters({
      transmision: undefined,
      combustible: undefined,
      minKilometraje: undefined,
      maxKilometraje: undefined,
      minPrecio: undefined,
      maxPrecio: undefined,
      tipoId: undefined,
      brandId: undefined,
    });
  };

  const { cars } = useSelector((state: RootState) => state.cars);

  return (
    <section className="pt-28">
      <button
        className="mb-4 px-4 py-2 rounded"
        onClick={() => setIsFilterVisible(!isFilterVisible)}
      >
        Filtros
        <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
      </button>
      <FilterBar   
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
      />
      <CarsPagination/>
      <div className={`grid grid-cols-1 px-6 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${isFilterVisible ? 'ml-64' : ''}`}>
        {cars.map((v: Vehiculo) => (
          <CarsCard
            key={v.id}
            id={v.id}
            imageUrl={v.imagenes?.map((img) => img.url)}
            title={`${v.brand?.nombre || "Sin marca"} ${v.modelo} - ${v.year}`}
            subtitle={v.descripcion}
            kilometraje={v.kilometraje || 0}
            fuelType={v.combustible || 'Sin especificar'}
            transmission={v.transmision || 'Sin especificar'}
            price={`$${v.precio}`}
          />
        ))}
      </div>
      <CarsPagination/>
      <Footer/>
    </section>
  );
};

export default Cars;
