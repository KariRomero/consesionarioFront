import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchFilterOptions } from '@/redux/slices/filtersSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const FilterBar: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    transmision?: string;
    combustible?: string;
    tipoId?: string;
    brandId?: string;
  }) => void;
  onResetFilters: () => void;
}> = ({ isVisible, onClose, onApplyFilters, onResetFilters }) => {
  const dispatch: AppDispatch = useDispatch();

  const [transmision, setTransmision] = useState<string>('');
  const [combustible, setCombustible] = useState<string>('');
  const [tipoId, setTipoId] = useState<string>('');
  const [brandId, setBrandId] = useState<string>('');

  const { options } = useSelector((state: RootState) => state.filters || {});
  const brands = options?.brands || [];
  const tipos = options?.tipos || [];
  const transmisiones = options?.transmision || [];
  const combustibles = options?.combustible || [];

  // Actualiza opciones dinámicamente cuando se cambia algún filtro
  useEffect(() => {
    const queryParams: Record<string, string> = {};
    if (brandId) queryParams.brandId = brandId;
    if (tipoId) queryParams.tipoId = tipoId;
    if (transmision) queryParams.transmision = transmision;
    if (combustible) queryParams.combustible = combustible;
    dispatch(fetchFilterOptions(queryParams));
  }, [dispatch, brandId, tipoId, transmision, combustible]);

  const applyFilters = () => {
    onApplyFilters({
      transmision: transmision || undefined,
      combustible: combustible || undefined,
      tipoId: tipoId || undefined,
      brandId: brandId || undefined,
    });
  };

  const resetLocalFilters = () => {
    setBrandId('');
    setTipoId('');
    setTransmision('');
    setCombustible('');
    dispatch(fetchFilterOptions({})); // volver a traer todas las opciones
    onResetFilters();
  };

  return (
    <aside
    className={`fixed top-20 left-0 w-64 h-full bg-white shadow-lg p-4 z-50 transition-transform transform ${
      isVisible ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
      <div className="flex justify-end items-center mb-4">
        <button className="font-bold" onClick={onClose}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      {/* Marca */}
      <div className='mb-2'>
        <label className='block text-sm font-semibold'>Marca</label>
        <select
          className='w-full p-1 border rounded-lg'
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option value="">Todos</option>
          {brands.map((b: any) => (
            <option key={b.id} value={b.id}>{b.nombre}</option>
          ))}
        </select>
      </div>

      {/* Tipo */}
      <div className='mb-2'>
        <label className='block text-sm font-semibold'>Tipo</label>
        <select
          className='w-full p-1 border rounded-lg'
          value={tipoId}
          onChange={(e) => setTipoId(e.target.value)}
        >
          <option value="">Todos</option>
          {tipos.map((t: any) => (
            <option key={t.id} value={t.id}>{t.nombre}</option>
          ))}
        </select>
      </div>

      {/* Transmisión */}
      <div className="mb-2">
        <label className="block text-sm font-semibold">Transmisión</label>
        <select
          className="w-full p-1 border rounded-lg"
          value={transmision}
          onChange={(e) => setTransmision(e.target.value)}
        >
          <option value="">Todos</option>
          {transmisiones.map((tr: string, i: number) => (
            <option key={i} value={tr}>{tr}</option>
          ))}
        </select>
      </div>

      {/* Combustible */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Combustible</label>
        <select
          className="w-full p-1 border rounded-lg"
          value={combustible}
          onChange={(e) => setCombustible(e.target.value)}
        >
          <option value="">Todos</option>
          {combustibles.map((c: string, i: number) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Botones */}
      <div className='flex flex-col gap-2'>
        <button className="rounded p-2 w-full bg-primary text-white" onClick={applyFilters}>
          Aplicar Filtros
        </button>
        <button className="rounded p-2 w-full border" onClick={resetLocalFilters}>
          Restablecer Filtros
        </button>
      </div>
    </aside>
  );
};

export default FilterBar;