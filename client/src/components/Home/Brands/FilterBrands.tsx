'use client';

import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchBrands } from "@/redux/slices/brandsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import FilteredByBrand from "./FilteredByBrand";
import { Brand } from "@/types/types";

const CARD_WIDTH_LG = 300;
const CARD_WIDTH_SM = 33.33;
const CARD_WIDTH_XS = 60;

const FilterBrands: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { brands } = useSelector((state: RootState) => state.brands);
  const [brandId, setBrandId] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    dispatch(fetchBrands());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const duplicated = brands.length > 0
    ? (typeof window !== 'undefined' && window.innerWidth >= 640 ? [...brands, ...brands] : brands)
    : [];

  const getMinWidth = () => {
    if (typeof window === 'undefined') return '100%';
    const width = window.innerWidth;
    if (width < 640) return "100%";
    if (width < 1024) return `calc(${duplicated.length} * ${CARD_WIDTH_SM}vw)`;
    return `${duplicated.length * CARD_WIDTH_LG}px`;
  };

  const [minWidth, setMinWidth] = useState(getMinWidth());

  useEffect(() => {
    const handleResize = () => setMinWidth(getMinWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [duplicated.length]);

  const handleClick = (id: string) => setBrandId(id);

  if (!hasMounted || brands.length === 0) return null;

  return (
    <>
      <div className="overflow-hidden w-full relative">
        <div
          ref={scrollRef}
          className={`flex gap-4 ${isMobile ? 'overflow-x-auto overflow-y-hidden px-4 scrollbar-hide' : 'animate-scroll-x'}`}
          style={{
            minWidth,
            animationDuration: !isMobile ? `${brands.length * 12}s` : undefined,
            animationTimingFunction: !isMobile ? "linear" : undefined,
            animationIterationCount: !isMobile ? "infinite" : undefined,
          }}
        >
          {duplicated.map((b: Brand, index) => (
            <button
              key={`${b.id}-${index}`}
              className={`flex flex-col items-center border border-grey rounded-md p-4 font-semibold hover:shadow-md shrink-0
                ${isMobile ? 'w-[60vw]' : 'sm:w-1/3 lg:w-[300px]'}
                h-44`}
              onClick={() => handleClick(b.id)}
            >
              <div className="relative w-full h-32">
                <Image
                  sizes="(max-width: 768px) 100vw, 200px"
                  src={b.ImageBrand || '/car1'}
                  fill
                  alt={b.nombre}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <FilteredByBrand brandId={brandId ?? ''} />
    </>
  );
};

export default FilterBrands;