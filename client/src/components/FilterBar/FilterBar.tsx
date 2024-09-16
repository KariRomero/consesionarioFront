import React from 'react';
import BrandFilter from './BrandFilter'; 
import TypeFilter from './typesFilter'; 
import CombustibleFilter from './CombustibleFilter'; 
import TransmisionFilter from './TransmisionFilter'; 

interface FilterBarProps {
  filters: {
    brand: string;
    tipo: string;
    fuelType: string;
    kilometraje: number;
    transmision: string;
  };
  onFilterChange: (key: string, value: string | number) => void;
  onResetFilters: () => void;
  isVisible: boolean;
  onClose: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isVisible,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-20 left-0 w-64 h-full bg-white shadow-lg p-4 transition-transform transform ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Filtros</h2>
        <button className="text-red-500 font-bold" onClick={onClose}>
          X
        </button>
      </div>

      {/* Filtro de Marca */}
      <BrandFilter
        selectedBrand={filters.brand}
        onBrandChange={(brand) => onFilterChange('brand', brand)}
      />

      {/* Filtro de Tipo */}
      <TypeFilter
        selectedType={filters.tipo}
        onTypeChange={(tipo) => onFilterChange('tipo', tipo)}
      />

      {/* Filtro de Combustible */}
      <CombustibleFilter
        selectedCombustible={filters.fuelType}
        onCombustibleChange={(fuelType) => onFilterChange('fuelType', fuelType)}
      />

      {/* Filtro de Transmisión */}
      <TransmisionFilter
        selectedTransmision={filters.transmision}
        onTransmisionChange={(transmision) => onFilterChange('transmision', transmision)}
      />

      {/* Filtro de Rango de Kilometraje */}
      <input
        type="range"
        min="0"
        max="300000"
        step="10000"
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        onChange={(e) => onFilterChange('kilometraje', Number(e.target.value))}
        value={filters.kilometraje}
      />

      {/* Botón de Restablecer */}
      <button className="bg-red-500 text-black rounded p-2 w-full" onClick={onResetFilters}>
        Restablecer Filtros
      </button>
    </div>
  );
};

export default FilterBar;