'use client';

import FilterBrands from "./FilterBrands";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Brands: React.FC = () => {
  const { brands } = useSelector((state: RootState) => state.brands);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showHint = isMobile && brands.length > 1;

  return (
    <section className="w-full">
      <Link href={'/cars'}>
        <h1 className="text-center text-3xl font-semibold pb-8">
          Nuestras marcas
        </h1>
      </Link>

      {showHint && (
        <p className="text-center text-sm text-gray-700 -mt-6 mb-4 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
          deslizá para ver más
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
        </p>
      )}

      <FilterBrands />
    </section>
  );
};

export default Brands;