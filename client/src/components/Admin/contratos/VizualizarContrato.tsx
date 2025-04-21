'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ContratoDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [contrato, setContrato] = useState<any>(null);

  useEffect(() => {
    const fetchContrato = async () => {
      try {
        const res = await axios.get(`${prod_url}/contratos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setContrato(res.data);
      } catch (error) {
        toast.error('Error al obtener el contrato');
      }
    };

    fetchContrato();
  }, [id]);

  const eliminarContrato = () => {
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
                await axios.delete(`${prod_url}/contratos/${id}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                });
                toast.dismiss(t.id);
                toast.success('Contrato eliminado con éxito');
                router.push('/admin/contratos');
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

  if (!contrato) return <p className="p-6">Cargando contrato...</p>;

  return (
    <div className="relative w-full p-6 bg-white rounded shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {contrato.vehiculo.brand.nombre} {contrato.vehiculo.modelo}
            {contrato.vehiculo.dominio ? ` (${contrato.vehiculo.dominio})` : ''}
          </h2>
          <p className="text-gray-600 text-sm">Cliente: {contrato.cliente.nombre} {contrato.cliente.apellido}</p>
        </div>

        <button
          onClick={eliminarContrato}
          className="text-red-600 hover:text-red-800 text-2xl p-2 rounded-lg border border-red-200 hover:bg-red-50 transition"
          title="Eliminar contrato"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="w-full flex justify-center items-center py-4">
  <div className="w-full md:w-[90%] h-[90vh] overflow-hidden">
    <iframe
      src={contrato.pdfUrl}
      className="w-full h-full border-none"
      allow="fullscreen"
      title="Contrato PDF"
    />
  </div>
</div>

      <div className="mt-4">
        <a
          href={`${contrato.pdfUrl}?fl_attachment=true`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-black px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          ver contrato
        </a>
      </div>
    </div>
  );
}