import { useState, useEffect, useRef, useMemo } from 'react';
import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTipos } from '@/redux/slices/tiposSlice';
import { Tipo, Brand } from '@/types/types';
import Image from 'next/image';
import FilterByTipo from './FilterByElement';
import FilterByElement from './FilterByElement';

type DisplayBrandsTiposProps = {
    element: Tipo[] | Brand[]
}


const DisplayBrandsTipos = ({
    element
}: DisplayBrandsTiposProps) => {
    const [elementId, setElementId] = useState<string | undefined>(undefined);
    const [selected, setSelected] = useState<string | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const elementType = useMemo<'tipo' | 'brand'>(() => {
        if (element.length === 0) return 'tipo'; // default
        const first = element[0];
        return 'ImageTipo' in first ? 'tipo' : 'brand';
    }, [element]);


    const handleClick = async (id: string) => {
        setElementId(id)
        setSelected(id)
        console.log('selected', id);
    };

    const handleWheel = (event: React.WheelEvent) => {
        event.preventDefault();
        const delta = Math.sign(event.deltaY);
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.scrollLeft += delta * 100; // Ajusta este valor para controlar la velocidad de desplazamiento horizontal
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
                passive: false
            });
            return () => {
                currentCarousel.removeEventListener('wheel', wheelHandler);
            };
        }
    }, [element?.length, handleWheel]);
    return (
        <>
            <div
                className='relative w-full overflow-hidden px-4'
                ref={carouselRef}
                style={{
                    // Oculta las barras de desplazamiento pero mantiene el scroll activo
                    scrollbarWidth: 'none', // Para Firefox
                    msOverflowStyle: 'none' // Para Internet Explorer y Edge
                }}
            >
                <div
                    className='flex fap-4 overflow-x-visible'
                    style={{
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch'
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
                                        minWidth: '20%'
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
            {elementId && (
                <FilterByElement elementId={elementId} elementType={elementType} />
            )}
        </>
    )
}


export default DisplayBrandsTipos