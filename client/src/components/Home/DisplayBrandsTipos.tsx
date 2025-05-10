import { useState, useEffect, useRef, useMemo } from 'react';
import { Tipo, Brand } from '@/types/types';
import Image from 'next/image';
import FilterByElement from './FilterByElement';

type DisplayBrandsTiposProps = {
    element: Tipo[] | Brand[];
};

const DisplayBrandsTipos = ({ element }: DisplayBrandsTiposProps) => {
    const [elementId, setElementId] = useState<string | undefined>(undefined);
    const [selected, setSelected] = useState<string | null>(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true); // Controla el desplazamiento automático
    const carouselRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Referencia al temporizador

    const elementType = useMemo<'tipo' | 'brand'>(() => {
        if (element.length === 0) return 'tipo'; // default
        const first = element[0];
        return 'ImageTipo' in first ? 'tipo' : 'brand';
    }, [element]);

    const handleClick = async (id: string) => {
        setElementId(id);
        setSelected(id);
        console.log('selected', id);
    };

    const handleWheel = (event: React.WheelEvent) => {
        event.preventDefault();
        const delta = Math.sign(event.deltaY);
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.scrollLeft += delta * 100; // Ajusta este valor para controlar la velocidad de desplazamiento horizontal
        }
        setIsAutoScrolling(false); // Detener el desplazamiento automático cuando el usuario hace scroll

        // Reinicia el temporizador de inactividad para reactivar el desplazamiento automático
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsAutoScrolling(true); // Reactivar el desplazamiento automático después de 3 segundos de inactividad
        }, 3000); // 3 segundos de inactividad
    };

    const startAutoScroll = () => {
        const carousel = carouselRef.current;
        if (carousel && isAutoScrolling) {
            carousel.scrollLeft += 1; // Ajusta la velocidad del desplazamiento automático
        }
    };

    const handleScrollEnd = () => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const totalWidth = carousel.scrollWidth;
        const currentScroll = carousel.scrollLeft;
        const maxScroll = totalWidth - carousel.clientWidth;

        // Cuando llegamos al final del carrusel, volvemos al principio (infinito)
        if (currentScroll >= maxScroll) {
            carousel.scrollLeft = 0;
        }
    };

    useEffect(() => {
        const currentCarousel = carouselRef.current;

        if (currentCarousel) {
            const wheelHandler = (e: WheelEvent) => {
                e.preventDefault();
                handleWheel(e as unknown as React.WheelEvent);
            };

            currentCarousel.addEventListener('wheel', wheelHandler, {
                passive: false,
            });

            // Desplazamiento automático
            const autoScrollInterval = setInterval(startAutoScroll, 30); // Ajusta la velocidad del auto-scroll aquí

            // Para hacer el desplazamiento infinito
            currentCarousel.addEventListener('scroll', handleScrollEnd);

            return () => {
                clearInterval(autoScrollInterval); // Limpia el intervalo cuando el componente se desmonte
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current); // Limpiar el temporizador
                }
                currentCarousel.removeEventListener('wheel', wheelHandler);
                currentCarousel.removeEventListener('scroll', handleScrollEnd); // Limpia el listener de scroll
            };
        }
    }, [element?.length, handleWheel, isAutoScrolling]);

    return (
        <>
            <div
                className="relative w-full overflow-hidden px-4"
                ref={carouselRef}
                style={{
                    scrollbarWidth: 'none', // Para Firefox
                    msOverflowStyle: 'none', // Para Internet Explorer y Edge
                }}
            >
                <div
                    className="flex fap-4 overflow-x-visible"
                    style={{
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {element && element.length > 0 ? (
                        <>
                            {element.map((e) => (
                                <button
                                    key={e.id}
                                    className={`flex flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md p-10 my-2 font-semibold hover:shadow-md
                                          ${selected === e.id ? 'shadow-md' : ''}`}
                                    style={{
                                        minWidth: '20%',
                                    }}
                                    onClick={() => handleClick(e.id)}
                                >
                                    <div className="relative w-full h-32">
                                        <Image
                                            sizes="(max-width: 768px) 100vw, 200px"
                                            src={(e as Tipo).ImageTipo || (e as Brand).ImageBrand || '/default.png'}
                                            fill
                                            alt={e.nombre}
                                            className="w-full h-full object-contain"
                                        />
                                        {'ImageTipo' in e && e.nombre}
                                    </div>
                                </button>
                            ))}
                        </>
                    ) : (
                        []
                    )}
                </div>
            </div>
            {elementId && <FilterByElement elementId={elementId} elementType={elementType} />}
        </>
    );
};

export default DisplayBrandsTipos;
