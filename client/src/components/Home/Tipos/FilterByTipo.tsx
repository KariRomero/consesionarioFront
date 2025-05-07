import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTiposById } from "@/redux/slices/tiposSlice";
import CarsCard from "@/components/Cars/Card/CarsCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from "@/types/types";

const FilterByTipo: React.FC<{ tipoId: string }> = ({ tipoId }) => {
  const dispatch: AppDispatch = useDispatch();
  const { tipo, loading } = useSelector((state: RootState) => state.tipos);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [isCarousel, setIsCarousel] = useState(false);

  useEffect(() => {
    if (tipoId.trim() !== '') {
      dispatch(fetchTiposById(tipoId));
    }
  }, [tipoId, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobileView = width < 640;
      setIsMobile(isMobileView);
      if (isMobileView) setCardsToShow(1);
      else if (width < 1024) setCardsToShow(2);
      else {
        setCardsToShow(4);
        setIsCarousel(!isMobileView && (tipo?.vehiculos?.length || 0) > 4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tipo?.vehiculos?.length]);

  useEffect(() => {
    if (!isCarousel || !scrollRef.current) return;

    const el = scrollRef.current;
    let paused = false;

    const scrollStep = () => {
      if (!paused) {
        el.scrollLeft += 1;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
          el.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scrollStep, 20);

    el.addEventListener("mouseenter", () => (paused = true));
    el.addEventListener("mouseleave", () => (paused = false));

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", () => (paused = true));
      el.removeEventListener("mouseleave", () => (paused = false));
    };
  }, [isCarousel]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % (tipo?.vehiculos?.length || 1));
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + (tipo?.vehiculos?.length || 1)) % (tipo?.vehiculos?.length || 1)
    );
  };

  const displayedCards = tipo?.vehiculos?.slice(currentIndex, currentIndex + cardsToShow) || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!tipo?.vehiculos?.length) return null;

  return (
    <div className="relative w-full px-4 sm:px-10 py-10">
      {/* Flechas solo si no hay carrusel */}
      {!isMobile && !isCarousel && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className={`flex ${isMobile ? "overflow-x-auto flex-nowrap scrollbar-hide" : isCarousel ? "overflow-hidden flex-nowrap" : "flex-wrap justify-center gap-x-5"}`}
      >
        {(isCarousel || isMobile)
          ? tipo.vehiculos.map((v: Vehiculo) => (
              <div key={v.id} className={isMobile ? "min-w-[90%] pr-4" : "min-w-[25%] px-2"}>
                <CarsCard car={v} />
              </div>
            ))
          : displayedCards.map((v: Vehiculo) => (
              <CarsCard key={v.id} car={v} />
            ))}
      </div>
    </div>
  );
};

export default FilterByTipo;