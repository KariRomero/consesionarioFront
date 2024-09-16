import React from 'react';
import BrandFilter from './BrandFilter';
import TypeFilter from './typesFilter';
import CombustibleFilter from './CombustibleFilter';
import TransmisionFilter from './TransmisionFilter';
import KilometrajeFilter from './KilometrajeFilter';

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

      <BrandFilter
        selectedBrand={filters.brand}
        onBrandChange={(brand) => onFilterChange('brand', brand)}
      />

      <TypeFilter
        selectedType={filters.tipo}
        onTypeChange={(tipo) => onFilterChange('tipo', tipo)}
      />

      <CombustibleFilter
        selectedCombustible={filters.fuelType}
        onCombustibleChange={(fuelType) => onFilterChange('fuelType', fuelType)}
      />

      <TransmisionFilter
        selectedTransmision={filters.transmision}
        onTransmisionChange={(transmision) => onFilterChange('transmision', transmision)}
      />

      {/* Filtro de Rango de Kilometraje */}
      <KilometrajeFilter
        selectedKilometraje={filters.kilometraje}
        onKilometrajeChange={(kilometraje) => onFilterChange('kilometraje', kilometraje)}
      />

      <button className="bg-red-500 text-black rounded p-2 w-full" onClick={onResetFilters}>
        Restablecer Filtros
      </button>
    </div>
  );
};

export default FilterBar;