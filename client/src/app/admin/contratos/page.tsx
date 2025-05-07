'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { prod_url } from '@/utils/routes';
import TablaContratos from '@/components/Admin/contratos/TablaContratos';
import CrearContratoModal from '@/components/Admin/contratos/CrearContratoModal';

export default function ContratosPage() {
  const [contratos, setContratos] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const fetchContratos = async () => {
    try {
      const res = await axios.get(`${prod_url}/contratos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setContratos(res.data);
    } catch (err) {
      console.error('Error cargando contratos', err);
    }
  };

  useEffect(() => {
    fetchContratos();
  }, []);

  const handleContratoCreado = () => {
    setIsModalOpen(false);
    fetchContratos();
  };

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contratos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faPlus} />
          Crear contrato
        </button>
      </div>

      {contratos.length > 0 ? (
        <TablaContratos contratos={contratos} onDelete={fetchContratos} />
      ) : (
        <div className="text-gray-500">Cargando contratos...</div>
      )}

      <CrearContratoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContratoCreado={handleContratoCreado}
      />
    </section>
  );
}