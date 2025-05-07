'use client';

import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTipos } from "@/redux/slices/tiposSlice";
import { Tipo } from "@/types/types";
import Image from "next/image";
import FilterByTipo from "./FilterByTipo";

const CARD_WIDTH_LG = 300;
const CARD_WIDTH_SM = 33.33;
const CARD_WIDTH_XS = 50;

const FilterTipos: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tipos } = useSelector((state: RootState) => state.tipos);
  const [tipoId, setTipoId] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);
  const duplicated = tipos.length > 0 ? [...tipos, ...tipos] : [];

  const scrollRef = useRef<HTMLDivElement>(null);

  const getMinWidth = () => {
    if (typeof window === 'undefined') return '100%';
    const width = window.innerWidth;
    if (width < 640) return `calc(${duplicated.length} * ${CARD_WIDTH_XS}vw)`;
    if (width < 1024) return `calc(${duplicated.length} * ${CARD_WIDTH_SM}vw)`;
    return `${duplicated.length * CARD_WIDTH_LG}px`;
  };

  const [minWidth, setMinWidth] = useState(getMinWidth());

  useEffect(() => {
    setHasMounted(true);
    dispatch(fetchTipos());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setMinWidth(getMinWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [duplicated.length]);

  const handleClick = (id: string) => setTipoId(id);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const pauseAnim = () => (el.style.animationPlayState = 'paused');
    const resumeAnim = () => (el.style.animationPlayState = 'running');

    el.addEventListener('touchstart', pauseAnim);
    el.addEventListener('touchend', resumeAnim);
    el.addEventListener('mousedown', pauseAnim);
    el.addEventListener('mouseup', resumeAnim);

    return () => {
      el.removeEventListener('touchstart', pauseAnim);
      el.removeEventListener('touchend', resumeAnim);
      el.removeEventListener('mousedown', pauseAnim);
      el.removeEventListener('mouseup', resumeAnim);
    };
  }, [scrollRef.current]);

  if (!hasMounted || tipos.length === 0) return null;

  return (
    <>
      <div className="overflow-hidden w-full relative">
        <div
          ref={scrollRef}
          className="animate-scroll-x flex gap-4"
          style={{
            minWidth,
            animationDuration: `${tipos.length * 12}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {duplicated.map((t: Tipo, index) => (
            <button
              key={`${t.id}-${index}`}
              onClick={() => handleClick(t.id)}
              className="flex flex-col items-center rounded-md p-4 font-semibold hover:shadow-md shrink-0 w-[50vw] sm:w-1/3 lg:w-[300px] h-36 sm:h-44"
            >
              <div className="w-full h-28 flex items-center justify-center relative">
                <Image
                  src={t.ImageTipo || "/default.png"}
                  alt={t.nombre}
                  width={180}
                  height={120}
                  className="object-contain"
                />
              </div>
              <span className="mt-2 text-center text-sm sm:text-base">{t.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      <FilterByTipo tipoId={tipoId ?? ""} />
    </>
  );
};

export default FilterTipos;