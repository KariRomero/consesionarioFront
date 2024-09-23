import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBrands } from "@/redux/slices/brandsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import FilteredByBrand from "./FilteredByBrand";
import Brand from "@/types/brand";

const FilterBrands = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);

    const { brands } = useSelector((state: RootState) => state.brands);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(6);
    const [brandId, setBrandId] = useState<number | undefined>(undefined);

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth < 640) {
                setCardsToShow(1);
            } else {
                setCardsToShow(6);
            }
        };
        resizeHandler();
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + brands.length) % brands.length);
    };

    const displayedBrands = brands?.slice(currentIndex, currentIndex + cardsToShow) as Brand[];

    const handleClick = async (id: number) => {
        setBrandId(id);
    };

    useEffect(() => {
        if (brandId !== undefined) {
        }
    }, [brandId]);        

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4">
                {
                    brands && brands.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-4 relative">
                            <button
                                onClick={prev}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-full z-20"
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <div className="flex gap-4">
                                {displayedBrands.map((b:Brand) => (
                                    <button
                                        key={b.id}
                                        className="flex flex-col items-center border border-grey rounded-md p-4 w-48 h-44 font-semibold hover:shadow-md overflow-hidden"
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
                            <button
                                onClick={next}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-full z-20"
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    ) : (
                        []
                    )
                }
            </div>

            <FilteredByBrand  brandId={brandId !== undefined ? brandId : 0}/>

        </div>
    );
};

export default FilterBrands;