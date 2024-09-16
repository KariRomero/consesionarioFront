import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';  // Usa el hook tipado
import { fetchCombustibles } from '../../redux/slices/combustibleSlice';
import { RootState } from '../../redux/store';

interface CombustibleFilterProps {
  selectedCombustible: string;
  onCombustibleChange: (combustible: string) => void;
}

const CombustibleFilter: React.FC<CombustibleFilterProps> = ({ selectedCombustible, onCombustibleChange }) => {
  const dispatch = useAppDispatch();  // Cambiado a useAppDispatch
  const { combustibles, loading, error } = useSelector((state: RootState) => state.combustibles);

  useEffect(() => {
    dispatch(fetchCombustibles());
  }, [dispatch]);

  if (loading) return <p>Loading combustibles...</p>;
  if (error) return <p>Error loading combustibles: {error}</p>;

  return (
    <select
      value={selectedCombustible}
      onChange={(e) => onCombustibleChange(e.target.value)}
      className="border border-gray-300 rounded p-2 mb-4 w-full"
    >
      <option value="">Selecciona Combustible</option>
      {combustibles.map((combustible) => (
        <option key={combustible} value={combustible}>
          {combustible}
        </option>
      ))}
    </select>
  );
};

export default CombustibleFilter;