'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { prod_url } from '@/utils/routes';

interface Vehiculo {
  id: string;
  modelo: string;
  year: number;
  dominio?: string;
  clienteId?: string | null;
}

interface Props {
  clienteId: string;
}

const AsociarVehiculos: React.FC<Props> = ({ clienteId }) => {
  const [asociados, setAsociados] = useState<Vehiculo[]>([]);
  const [disponibles, setDisponibles] = useState<Vehiculo[]>([]);

  const cargarVehiculos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${prod_url}/vehiculos/findAll/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const all: Vehiculo[] = res.data.vehiculos || [];
      setAsociados(all.filter(v => v.clienteId === clienteId));
      setDisponibles(all.filter(v => !v.clienteId));
    } catch (err) {
      toast.error('Error al cargar vehículos');
    }
  };

  useEffect(() => {
    cargarVehiculos();
  }, [clienteId]);

  const asociarVehiculo = async (vehiculoId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${prod_url}/vehiculos/${vehiculoId}`, { clienteId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Vehículo asociado');
      cargarVehiculos();
    } catch (err) {
      toast.error('Error al asociar vehículo');
    }
  };

  const desasociarVehiculo = async (vehiculoId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${prod_url}/vehiculos/${vehiculoId}`, { clienteId: null }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Vehículo desvinculado');
      cargarVehiculos();
    } catch (err) {
      toast.error('Error al desvincular vehículo');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Vehículos asociados</h3>
        {asociados.length === 0 && <p className="text-sm text-gray-600">No hay vehículos asociados</p>}
        <ul className="space-y-2">
          {asociados.map(v => (
            <li key={v.id} className="flex justify-between items-center border p-2 rounded">
              <span>{v.modelo} ({v.year}){v.dominio ? ` - Dominio: ${v.dominio.toUpperCase()}` : ''}</span>
              <button
                onClick={() => desasociarVehiculo(v.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Vehículos disponibles</h3>
        {disponibles.length === 0 && <p className="text-sm text-gray-600">No hay vehículos disponibles</p>}
        <ul className="space-y-2">
          {disponibles.map(v => (
            <li key={v.id} className="flex justify-between items-center border p-2 rounded">
              <span>{v.modelo} ({v.year}){v.dominio ? ` - Dominio: ${v.dominio.toUpperCase()}` : ''}</span>
              <button
                onClick={() => asociarVehiculo(v.id)}
                className="text-blue-600 text-sm hover:underline"
              >
                Asociar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AsociarVehiculos;