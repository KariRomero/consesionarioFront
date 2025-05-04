'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ClienteCard from '@/components/Admin/clientes/ClienteCard';
import { prod_url } from '@/utils/routes';
import AdminGuard from '@/components/Admin/AdminGuard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ClienteFormModal from '@/components/Admin/clientes/ClienteFormModal';

interface Imagen {
  url: string;
}

interface Vehiculo {
  id: string;
  modelo: string;
  year: number;
  imagenes: Imagen[];
}

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

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClientes = async () => {
    try {
      const res = await axios.get(`${prod_url}/clientes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setClientes(res.data);
    } catch (err) {
      console.error('Error cargando clientes:', err);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <AdminGuard>
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded-md transition"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            Crear cliente
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
        {clientes.map((cliente) => (
  <ClienteCard
    key={cliente.id}
    cliente={cliente}
    onUpdated={fetchClientes} // ✅ importante
  />
))}

        </div>
      </div>

      <ClienteFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchClientes(); // recarga lista
        }}
      />
    </AdminGuard>
  );
}
