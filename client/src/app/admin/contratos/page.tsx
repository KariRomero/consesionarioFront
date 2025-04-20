'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function ContratosPage() {
  const router = useRouter();

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

      {/* Acá irá el listado */}
      <div className="text-gray-500">Listado de contratos próximamente...</div>
    </section>
  );
}