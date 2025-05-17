'use client';

import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchFilterOptions } from '@/redux/slices/filtersSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Select, SelectItem } from '@nextui-org/react';

type Option = { id: string; nombre: string };

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
  const brands: Option[] = options?.brands || [];
  const tipos: Option[] = options?.tipos || [];
  const transmisiones: string[] = options?.transmision || [];
  const combustibles: string[] = options?.combustible || [];

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
    onClose(); // cerrar sidebar
  };

  const resetLocalFilters = () => {
    setBrandId('');
    setTipoId('');
    setTransmision('');
    setCombustible('');
    dispatch(fetchFilterOptions({}));
    onResetFilters();
  };

  const ensureSelectedPresent = <T extends { id: string; nombre: string }>(
    list: T[],
    selectedId: string
  ): T[] => {
    if (!selectedId) return list;
    const exists = list.some((item) => item.id === selectedId);
    if (!exists) {
      return [...list, { id: selectedId, nombre: selectedId } as T];
    }
    return list;
  };

  const ensureStringSelected = (list: string[], selected: string): string[] => {
    if (!selected || list.includes(selected)) return list;
    return [selected, ...list];
  };

  const brandsSafe = ensureSelectedPresent(brands, brandId);
  const tiposSafe = ensureSelectedPresent(tipos, tipoId);
  const transmisionesSafe = ensureStringSelected(transmisiones, transmision);
  const combustiblesSafe = ensureStringSelected(combustibles, combustible);

  const transmisionesItems = ['', ...transmisionesSafe].map((v) => ({
    label: v || 'Todos',
    value: v,
  }));

  const combustiblesItems = ['', ...combustiblesSafe].map((v) => ({
    label: v || 'Todos',
    value: v,
  }));

  return (
    <aside
      className={`fixed top-[4rem] left-0 w-64 h-full bg-white shadow-lg pt-[2rem] lg:pt-[3rem] p-4 z-50 transition-transform transform ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-end items-center mb-4">
        <button className="font-bold" onClick={onClose}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Marca */}
        <Select
          label="Marca"
          selectedKeys={brandId ? [brandId] : []}
          items={[{ id: '', nombre: 'Todos' }, ...brandsSafe]}
          onChange={(e) => setBrandId(e.target.value)}
        >
          {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
        </Select>

        {/* Tipo */}
        <Select
          label="Tipo"
          selectedKeys={tipoId ? [tipoId] : []}
          items={[{ id: '', nombre: 'Todos' }, ...tiposSafe]}
          onChange={(e) => setTipoId(e.target.value)}
        >
          {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
        </Select>

        {/* Transmisión */}
        <Select
          label="Transmisión"
          selectedKeys={transmision ? [transmision] : []}
          items={transmisionesItems}
          onChange={(e) => setTransmision(e.target.value)}
        >
          {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
        </Select>

        {/* Combustible */}
        <Select
          label="Combustible"
          selectedKeys={combustible ? [combustible] : []}
          items={combustiblesItems}
          onChange={(e) => setCombustible(e.target.value)}
        >
          {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
        </Select>

        {/* Botones */}
        <button
          className="rounded p-2 w-full bg-primary text-white"
          onClick={applyFilters}
        >
          Aplicar Filtros
        </button>
        <button
          className="rounded p-2 w-full border"
          onClick={resetLocalFilters}
        >
          Restablecer Filtros
        </button>
      </div>
    </aside>
  );
};

export default FilterBar;