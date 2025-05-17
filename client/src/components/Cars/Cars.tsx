'use client';

import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCars } from "@/redux/slices/carsSlice";
import CarsCard from "./Card/CarsCard";
import FilterBar from "../FilterBar/FilterBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CarsPagination from "./CarsPagination";
import VehiculoCardAdmin from "../Admin/Vehiculos/VehiculoCardAdmin";
import { Vehiculo } from "@/types/types";

interface CarsProps {
  editable?: boolean;
}

export default function Cars({ editable = false }: CarsProps) {
  const dispatch: AppDispatch = useDispatch();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<{
    transmision?: string;
    combustible?: string;
    minKilometraje?: number;
    maxKilometraje?: number;
    minPrecio?: number;
    maxPrecio?: number;
    tipoId?: string;
    brandId?: string;
  }>({});
  
  const [page, setPage] = useState(1);

  const { cars, total, limit } = useSelector((state: RootState) => state.cars);

  useEffect(() => {
    const token = localStorage.getItem('token') ?? undefined;
    dispatch(fetchCars({
      filters: { ...filters, page },
      editable,
      token,
    }));
  }, [dispatch, filters, editable, page]);

  const applyFilters = (newFilters: typeof filters) => {
    setPage(1);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setPage(1);
    setFilters({});
  };

  return (
    <section>
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

      

      <div className="grid grid-cols-1 px-6 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
        {cars.map((v: Vehiculo) =>
          editable ? (
            <VehiculoCardAdmin key={v.id} vehiculo={v} />
          ) : (
            <CarsCard key={v.id} car={v} />
          )
        )}
      </div>

      <CarsPagination
        currentPage={page}
        totalItems={total}
        itemsPerPage={limit}
        onPageChange={setPage}
      />
    </section>
  );
}