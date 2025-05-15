'use client';

import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState, useRef } from "react";
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

const FilterByElement = ({ elementId, elementType }: FilterByElementProps) => {
  const dispatch: AppDispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (elementId) {
      if (elementType === 'tipo') dispatch(fetchTiposById(elementId));
      if (elementType === 'brand') dispatch(fetchBrandById(elementId));
    }
  }, [elementId, elementType, dispatch]);

  const tipoState = useSelector((state: RootState) => state.tipos);
  const brandState = useSelector((state: RootState) => state.brands);

  const data = elementType === 'tipo' ? tipoState.tipo : brandState.brand;
  const loading = elementType === 'tipo' ? tipoState.loading : brandState.loading;
  const error = elementType === 'tipo' ? tipoState.error : brandState.error;

  const displayedCards: Vehiculo[] = data?.vehiculos || [];
  const titulo = data?.nombre || ''; // nombre del tipo o marca

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth < 640);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <p className="text-center py-10 text-red-500">{error}</p>
    );
  }

  return (
    <>
      <h2 className="text-center text-lg lg:text-2xl mt-[1.5rem] lg:mt-[2.5rem] font-semibold text-primary mb-[0.5rem] lg:mb-4">
        Estás viendo el {elementType === 'tipo' ? 'tipo' : 'marca'} {titulo}
      </h2>

      {isMobile && displayedCards.length > 1 && (
        <p className="text-center text-sm text-gray-500 mb-2 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faChevronLeft} className="text-[8px]" />
          deslizá para ver más
          <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
        </p>
      )}

      <div
        ref={scrollRef}
        className={`flex ${
          isMobile
            ? displayedCards.length === 1
              ? "justify-center px-4"
              : "overflow-x-auto scrollbar-hide space-x-4 px-4"
            : "flex-wrap justify-center gap-4 px-10"
        } py-10`}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        {displayedCards.map((v) => (
          <div
            key={v.id}
            className={`${
              isMobile
                ? displayedCards.length === 1
                  ? "w-full max-w-[90%]"
                  : "min-w-[90%]"
                : "w-[calc(20%-1rem)]"
            }`}
          >
            <CarsCard car={v} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterByElement;