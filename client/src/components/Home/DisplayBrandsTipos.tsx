'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { Tipo, Brand } from "@/types/types";
import Image from "next/image";
import FilterByElement from "./FilterByElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";



type DisplayBrandsTiposProps = {
    element: Tipo[] | Brand[];
    loading?: boolean;
  };

  const DisplayBrandsTipos = ({ element, loading }: DisplayBrandsTiposProps) => {
      const [elementId, setElementId] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef(0);

  const elementType = useMemo<"tipo" | "brand">(() => {
    if (element.length === 0) return "tipo";
    return "ImageTipo" in element[0] ? "tipo" : "brand";
  }, [element]);

  const handleClick = (id: string) => {
    setElementId(id);
    setSelected(id);
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (isMobile) return;
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollLeft += delta * 100;
    }
    setIsAutoScrolling(false);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  const startAutoScroll = () => {
    if (isMobile) return;
    const carousel = carouselRef.current;
    if (carousel && isAutoScrolling) {
      carousel.scrollLeft += 1;
      const maxScroll = carousel.scrollWidth / 2;
      if (carousel.scrollLeft >= maxScroll) {
        carousel.scrollLeft = 0;
      }
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      handleWheel(e as unknown as React.WheelEvent);
    };

    const touchStartHandler = (e: TouchEvent) => {
      if (e.touches.length === 1) startX.current = e.touches[0].clientX;
    };

    const touchMoveHandler = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = startX.current - e.touches[0].clientX;
        carousel.scrollLeft += deltaX;
        startX.current = e.touches[0].clientX;
      }
    };

    if (!isMobile) {
      carousel.addEventListener("wheel", wheelHandler, { passive: false });
    } else {
      carousel.addEventListener("touchstart", touchStartHandler, { passive: false });
      carousel.addEventListener("touchmove", touchMoveHandler, { passive: false });
    }

    const scrollInterval = setInterval(startAutoScroll, 30);

    return () => {
      clearInterval(scrollInterval);
      if (!isMobile) {
        carousel.removeEventListener("wheel", wheelHandler);
      } else {
        carousel.removeEventListener("touchstart", touchStartHandler);
        carousel.removeEventListener("touchmove", touchMoveHandler);
      }
    };
  }, [element?.length, isMobile, isAutoScrolling]);

  const duplicatedElements = useMemo(() => {
    return isMobile ? element : [...element, ...element];
  }, [element, isMobile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <>
      {isMobile && element.length > 1 && (
        <p className="text-center text-sm text-gray-500 mb-2 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faChevronLeft} className="text-[8px]" />
          deslizá para ver más
          <FontAwesomeIcon icon={faChevronRight} className="text-[8px]" />
        </p>
      )}

      <div
        className="relative w-full overflow-hidden px-4"
        ref={carouselRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div
          className={`flex fap-4 ${
            isMobile ? "overflow-x-auto scrollbar-hide" : "overflow-x-visible"
          }`}
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            touchAction: isMobile ? "pan-x" : undefined,
          }}
        >
          {duplicatedElements.map((e, index) => (
            <button
              key={`${e.id}-${index}`}
              onClick={() => handleClick(e.id)}
              className={`flex flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md p-10 my-2 font-semibold hover:shadow-md ${
                selected === e.id ? "shadow-md" : ""
              }`}
              style={{ minWidth: "20%" }}
            >
              <div className="relative w-full h-32">
                <Image
                  sizes="(max-width: 768px) 100vw, 200px"
                  src={
                    (e as Tipo).ImageTipo ||
                    (e as Brand).ImageBrand ||
                    "/default.png"
                  }
                  fill
                  alt={e.nombre}
                  className="w-full h-full object-contain"
                />
                {"ImageTipo" in e && e.nombre}
              </div>
            </button>
          ))}
        </div>
      </div>

      {elementId && (
        <FilterByElement elementId={elementId} elementType={elementType} />
      )}
    </>
  );
};

export default DisplayBrandsTipos;