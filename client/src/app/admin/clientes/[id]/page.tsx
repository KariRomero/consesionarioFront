'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import VehiculoCardMini from '@/components/Admin/Vehiculos/VehiculoCardMini';
import { Vehiculo } from '@/types/types'; // este sí lo estás usando

// 🔧 Tipo local para Cliente (sin necesidad de importar)
interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  direccion?: string;
  vehiculos: Vehiculo[];
}

export default function ClientePerfilPage() {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${prod_url}/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCliente(res.data))
      .catch((err) => console.error('Error cargando cliente:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-10">Cargando perfil del cliente...</p>;
  if (!cliente) return <p className="p-10 text-red-600">Cliente no encontrado.</p>;

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {cliente.nombre} {cliente.apellido}
      </h1>
      <p className="mb-2"><strong>DNI:</strong> {cliente.dni}</p>
      <p className="mb-2"><strong>Email:</strong> {cliente.email}</p>
      <p className="mb-2"><strong>Teléfono:</strong> {cliente.telefono}</p>
      {cliente.direccion && (
        <p className="mb-6"><strong>Dirección:</strong> {cliente.direccion}</p>
      )}

      <h2 className="text-2xl font-semibold mt-10 mb-4">Vehículos asociados</h2>
      {cliente.vehiculos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cliente.vehiculos.map((vehiculo) => (
            <VehiculoCardMini key={vehiculo.id} vehiculo={vehiculo} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Este cliente no tiene vehículos asociados.</p>
      )}
    </section>
  );
}