import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';  // Usa el hook tipado
import { fetchTypes } from '../../redux/slices/typeSlice';
import { RootState } from '../../redux/store';

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onTypeChange }) => {
  const dispatch = useAppDispatch();  // Cambiado a useAppDispatch
  const { types, loading, error } = useSelector((state: RootState) => state.types);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  if (loading) return <p>Loading types...</p>;
  if (error) return <p>Error loading types: {error}</p>;

  return (
    <select
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
      className="border border-gray-300 rounded p-2 mb-4 w-full"
    >
      <option value="">Selecciona Tipo de Vehículo</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;