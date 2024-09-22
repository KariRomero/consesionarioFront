import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTipos } from "@/redux/slices/tiposSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import FilterByTipo from "./FilterByTipo";

interface Vehiculo {
  id: number;
  modelo: string;
  year: number;
  descripcion: string;
  precio: number;
  transmision: string;
  combustible: string;
  kilometraje: number;
  tipoId: number;
  brandId: number;
  createdAt: string;
  updatedAt: string;
}

interface Tipo {
  id: number;
  nombre: string;
  ImageTipo?: string;
  vehiculos?: Vehiculo[];
}

const FilterTipos: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTipos())
  }, [dispatch])

  const { tipos } = useSelector((state: RootState) => state.tipos);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(5);
  const [tipoId, setTipoId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(2);
      } else {
        setCardsToShow(5);
      }
    };
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tipos.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tipos.length) % tipos.length);
  };

  const displayedtipos = tipos?.slice(currentIndex, currentIndex + cardsToShow);

  const handleClick = async (id: number) => {
    setTipoId(id);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4">
        {
          tipos && tipos.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4 relative">
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-full z-20"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div className="flex gap-4">
                {displayedtipos.map((t: Tipo) => (
                  <button
                    key={t.id}
                    className="flex flex-col items-center rounded-md p-4 w-48 h-44 font-semibold hover:shadow-md overflow-hidden"
                    onClick={() => handleClick(t.id)}
                  >
                    <div className="relative w-full h-32">
                      <Image
                        sizes="(max-width: 768px) 100vw, 200px"
                        src={t.ImageTipo || '/default.png'}
                        fill
                        alt={t.nombre}
                        className="w-full h-full object-contain"
                      />
                      {t.nombre}
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

      <FilterByTipo  tipoId={tipoId !== undefined ? tipoId : 0}/>

    </div>

  )
}

export default FilterTipos
