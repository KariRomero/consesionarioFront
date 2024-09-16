import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';  // Usa el hook tipado
import { fetchTransmision } from "../../redux/slices/transmSlice";  // Corrige la importación del slice correcto
import { RootState } from '../../redux/store';

interface TransmisionFilterProps {
  selectedTransmision: string;
  onTransmisionChange: (transmision: string) => void;
}

const TransmisionFilter: React.FC<TransmisionFilterProps> = ({ selectedTransmision, onTransmisionChange }) => {
  const dispatch = useAppDispatch();  // Usa el hook tipado
  const { transmisiones, loading, error } = useSelector((state: RootState) => state.transmisiones);

  useEffect(() => {
    dispatch(fetchTransmision());  // Llama a la acción fetchTransmision
  }, [dispatch]);

  if (loading) return <p>Loading transmision...</p>;
  if (error) return <p>Error loading transmision: {error}</p>;

  return (
    <select
      value={selectedTransmision}
      onChange={(e) => onTransmisionChange(e.target.value)}
      className="border border-gray-300 rounded p-2 mb-4 w-full"
    >
      <option value="">Selecciona Transmisión</option>
      {transmisiones.map((transmision) => (
        <option key={transmision} value={transmision}>
          {transmision}
        </option>
      ))}
    </select>
  );
};

export default TransmisionFilter;