'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ClienteCarousel from './ClienteCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { prod_url } from '@/utils/routes';

interface Imagen {
  url: string;
}

interface Vehiculo {
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

interface ClienteCardProps {
  cliente: Cliente;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ cliente }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const imagenes = cliente.vehiculos
    .map((v) => v.imagenes?.[0]?.url)
    .filter(Boolean);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${prod_url}/clientes/${cliente.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`Cliente "${cliente.nombre} ${cliente.apellido}" eliminado`);
      setShowModal(false);
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
      toast.error('Error al eliminar el cliente');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[300px] md:w-[350px] flex flex-col">
      {imagenes.length > 0 && <ClienteCarousel imagenes={imagenes} />}

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{cliente.nombre} {cliente.apellido}</h2>
        <p><span className="font-semibold">DNI:</span> {cliente.dni}</p>
      </div>

      <div className="border-t px-4 py-2 space-y-1 text-sm">
        <p><span className="font-semibold">Tel:</span> {cliente.telefono}</p>
        <p><span className="font-semibold">Email:</span> {cliente.email}</p>
        {cliente.direccion && (
          <p><span className="font-semibold">Dirección:</span> {cliente.direccion}</p>
        )}
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t text-blue-600 text-sm font-medium">
        <Link href={`/admin/clientes/${cliente.id}`} className="hover:underline">Ver detalle</Link>
        <div className="flex gap-3">
          <Link href={`/admin/clientes/${cliente.id}/editar`} className="hover:underline">
            Editar
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="text-red-600 hover:text-red-700"
            title="Eliminar cliente"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4">
              ¿Seguro que querés eliminar a {cliente.nombre} {cliente.apellido}?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteCard;