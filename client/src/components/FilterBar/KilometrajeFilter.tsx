// src/components/FilterBar/KilometrajeFilter.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks'; // Usa el hook tipado
import { fetchKilometrajeRange } from "../../redux/slices/kilometrajeSlile";
import { RootState } from '../../redux/store';

interface KilometrajeFilterProps {
  selectedKilometraje: number;
  onKilometrajeChange: (kilometraje: number) => void;
}

const KilometrajeFilter: React.FC<KilometrajeFilterProps> = ({ selectedKilometraje, onKilometrajeChange }) => {
  const dispatch = useAppDispatch();
  const { minKilometraje, maxKilometraje, loading, error } = useSelector((state: RootState) => state.kilometraje);

  // Estado local para el slider del rango máximo
  const [maxRange, setMaxRange] = useState<number>(selectedKilometraje);

  useEffect(() => {
    dispatch(fetchKilometrajeRange());
  }, [dispatch]);

  useEffect(() => {
    // Actualizar el estado local si cambian los filtros globales
    setMaxRange(selectedKilometraje);
  }, [selectedKilometraje]);

  if (loading) return <p>Loading kilometraje range...</p>;
  if (error) return <p>Error loading kilometraje range: {error}</p>;

  const handleMaxChange = (max: number) => {
    setMaxRange(max);
    onKilometrajeChange(max); // Actualizar el filtro global
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span>0 km</span> {/* Mostrar el valor mínimo fijo */}
        <span>{maxRange} km</span> {/* Mostrar el valor máximo dinámico */}
      </div>
      <input
        type="range"
        min={minKilometraje}  // Mínimo fijo desde la base de datos
        max={maxKilometraje}  // Máximo fijo desde la base de datos
        step="1000"
        value={maxRange}
        onChange={(e) => handleMaxChange(Number(e.target.value))}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
    </div>
  );
};

export default KilometrajeFilter;