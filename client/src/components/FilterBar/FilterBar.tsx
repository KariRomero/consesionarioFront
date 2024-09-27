import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchBrands } from '@/redux/slices/brandsSlice';
import { fetchTipos } from '@/redux/slices/tiposSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const FilterBar: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    transmision?: string;
    combustible?: string;
    minKilometraje?: number;
    maxKilometraje?: number;
    minPrecio?: number;
    maxPrecio?: number;
    tipoId?: number;
    brandId?: number;
  }) => void;
  onResetFilters: () => void;
}> = ({ isVisible, onClose, onApplyFilters, onResetFilters }) => {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands())
    dispatch(fetchTipos())
  }, [dispatch]);

  const { brands } = useSelector((state: RootState) => state.brands);
  const { tipos } = useSelector((state: RootState) => state.tipos);

  const [transmision, setTransmision] = useState<string | undefined>(undefined);
  const [combustible, setCombustible] = useState<string | undefined>(undefined);
  const [minKilometraje, setMinKilometraje] = useState<number>(0);
  const [maxKilometraje, setMaxKilometraje] = useState<number>(10000);
  const [minPrecio, setMinPrecio] = useState<number | undefined>(undefined);
  const [maxPrecio, setMaxPrecio] = useState<number | undefined>(undefined);
  const [tipoId, setTipoId] = useState<number | undefined>(undefined);
  const [brandId, setBrandId] = useState<number | undefined>(undefined);

  const applyFilters = () => {
    onApplyFilters({
      transmision,
      combustible,
      minKilometraje,
      maxKilometraje,
      minPrecio,
      maxPrecio,
      tipoId,
      brandId,
    });
  };

  return (
    <aside
      className={`fixed top-20 left-0 w-64 h-full bg-white shadow-lg p-4 transition-transform transform ${isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex justify-end items-center">
        <button className="font-bold" onClick={onClose}>
        <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className='mb-2'>
        <label className='block text-sm font-semibold'>Marca</label>
        <select
          className='w-full p-1 border rounded-lg'
          value={brandId}
          onChange={(e) => setBrandId(Number(e.target.value))}
        >
          <option value="">Cualquiera</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.nombre}</option>
          ))}
        </select>
      </div>

      <div className='mb-2'>
        <label className='block text-sm font-semibold'>Tipo</label>
        <select
          className='w-full p-1 border rounded-lg'
          value={tipoId}
          onChange={(e) => setTipoId(Number(e.target.value))}
        >
          <option value="">Cualquiera</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>{t.nombre}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-semibold">Transmisión</label>
        <select
          className="w-full p-1 border rounded-lg"
          value={transmision}
          onChange={(e) => setTransmision(e.target.value)}
        >
          <option value="">Cualquiera</option>
          <option value="manual">Manual</option>
          <option value="automatica">Automático</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-semibold">Combustible</label>
        <select
          className="w-full p-1 border rounded-lg"
          value={combustible}
          onChange={(e) => setCombustible(e.target.value)}
        >
          <option value="">Cualquiera</option>
          <option value="gasolina">Gasolina</option>
          <option value="diesel">Diésel</option>
          <option value="hibrido">Híbrido</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-semibold">Precio Mínimo</label>
        <input
          type="number"
          className="w-full p-1 border rounded-lg"
          value={minPrecio || ''}
          onChange={(e) => setMinPrecio(Number(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-semibold">Precio Máximo</label>
        <input
          type="number"
          className="w-full p-1 border rounded-lg"
          value={maxPrecio || ''}
          onChange={(e) => setMaxPrecio(Number(e.target.value))}
        />
      </div>

      <div className='mb-4'>
        <div className="flex justify-between mb-2">
          <span>{minKilometraje} km</span>
          <span>{maxKilometraje} km</span>
        </div>
        <input
          type="range"
          min={0}
          max={150000}
          step="1000"
          value={maxKilometraje}
          onChange={(e) => setMaxKilometraje(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className='flex justify-center items-center'>
        <button className="rounded p-2 w-full mb-2" onClick={applyFilters}>
          Aplicar Filtros
        </button>
        <button className="rounded p-2 w-full" onClick={onResetFilters}>
          Restablecer Filtros
        </button>
      </div>

    </aside>
  );
};

export default FilterBar;
