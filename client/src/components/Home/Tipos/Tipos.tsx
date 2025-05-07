'use client';

import FilterTipos from "./FilterTipos";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tipos: React.FC = () => {
  const { tipos } = useSelector((state: RootState) => state.tipos);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showHint = isMobile && tipos.length > 1;

  return (
    <section className="w-full">
      <Link href={'/cars'}>
        <h1 className="text-center text-3xl font-semibold pb-8">
          Tipos de vehículos
        </h1>
      </Link>

      {showHint && (
        <p className="text-center text-sm text-gray-700 -mt-6 mb-4 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
          deslizá para ver más
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
        </p>
      )}

      <FilterTipos />
    </section>
  );
};

export default Tipos;