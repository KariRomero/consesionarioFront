'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';

interface Contrato {
  id: string;
  fechaContrato: string;
  cliente: { id: string; nombre: string; apellido: string; dni: string };
  vehiculo: { id: string; modelo: string; year: number; dominio: string | null; brand: { nombre: string } };
}

export default function TablaContratos() {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchContratos = async () => {
      const res = await axios.get(`${prod_url}/contratos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setContratos(res.data);
    };

    fetchContratos();
  }, []);

  const eliminarContrato = (contrato: Contrato) => {
    toast.custom((t) => (
      <div className="bg-white shadow-md rounded p-4 flex flex-col gap-2 border border-gray-200 w-80">
        <p className="text-sm text-gray-800">
          ¿Eliminar contrato del vehículo <b>{contrato.vehiculo.brand.nombre} {contrato.vehiculo.modelo}</b>
          {contrato.vehiculo.dominio ? ` con dominio ${contrato.vehiculo.dominio}` : ''}?
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              try {
                await axios.delete(`${prod_url}/contratos/${contrato.id}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                });
                toast.dismiss(t.id);
                toast.success('Contrato eliminado con éxito');
                setContratos((prev) => prev.filter((c) => c.id !== contrato.id));
              } catch (error) {
                console.error('Error al eliminar contrato:', error);
                toast.error('Error al eliminar el contrato');
              }
            }}
            className="text-sm px-3 py-1 rounded bg-red-600 text-black hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="px-4 py-2 border"> Fecha</th>
            <th className="px-4 py-2 border"> Vehículo</th>
            <th className="px-4 py-2 border"> Cliente</th>
            <th className="px-4 py-2 border"> DNI</th>
            <th className="px-4 py-2 border"> Acción</th>
          </tr>
        </thead>
        <tbody>
          {contratos.map((contrato) => (
            <tr
              key={contrato.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-2 border">
                {new Date(contrato.fechaContrato).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">
                {contrato.vehiculo?.brand?.nombre} {contrato.vehiculo?.modelo}
                {contrato.vehiculo?.dominio ? ` (${contrato.vehiculo.dominio})` : ''}
                <button
                  onClick={() => router.push(`/admin/vehiculos/${contrato.vehiculo.id}/editar`)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  title="Editar vehículo"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </td>
              <td className="px-4 py-2 border">
                {contrato.cliente?.nombre} {contrato.cliente?.apellido}
                <button
                  onClick={() => router.push(`/admin/clientes/${contrato.cliente.id}`)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  title="Ver cliente"
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </td>
              <td className="px-4 py-2 border">{contrato.cliente?.dni}</td>
              <td className="px-4 py-2 border flex gap-2">
                <button
                  onClick={() => router.push(`/admin/contratos/${contrato.id}`)}
                  className="bg-blue-600 text-black px-3 py-1 rounded hover:bg-blue-700"
                >
                  Ver contrato
                </button>
                <button
                  onClick={() => eliminarContrato(contrato)}
                  className="text-red-600 hover:text-red-800 px-2"
                  title="Eliminar contrato"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}