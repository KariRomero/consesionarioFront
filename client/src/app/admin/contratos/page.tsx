'use client';

import React, { useEffect, useState } from 'react';
import VizualizarContrato from '@/components/Admin/contratos/VizualizarContrato';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { prod_url } from '@/utils/routes';
import TablaContratos from '@/components/Admin/contratos/TablaContratos';

export default function ContratosPage() {
  const [contrato, setContrato] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchContrato = async () => {
      const res = await axios.get(`${prod_url}/contratos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      setContrato(res.data[0]);
    };
  
    fetchContrato();
  }, []);

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contratos</h1>
        <button
          onClick={() => router.push('/admin/contratos/crear')}
          className="flex items-center gap-2 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faPlus} />
          Crear contrato
        </button>
      </div>

      {contrato ? (
       <TablaContratos />
      ) : (
        <div className="text-gray-500">Cargando contrato...</div>
      )}
    </section>
  );
}