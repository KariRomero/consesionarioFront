'use client';

import { useEffect, useState } from 'react';
import AdminGuard from '@/components/Admin/AdminGuard';
import Cars from '@/components/Cars/Cars';
import CrearVehiculoModal from '@/components/Admin/Vehiculos/CrearVehiculoModal';
import { useSearchParams, useRouter } from 'next/navigation'; // ✅

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleVehiculoCreado = () => {
    setIsModalOpen(false);
    setRefreshKey(prev => prev + 1); // 🔥 actualizamos la lista
  };

  useEffect(() => {
    if (searchParams.get('reload') === 'true') {
      setRefreshKey(prev => prev + 1); // 🔥 forzar refresh después de eliminar
      const url = new URL(window.location.href);
      url.searchParams.delete('reload');
      router.replace(url.pathname); // 🔥 limpiamos la URL
    }
  }, [searchParams, router]);

  return (
    <AdminGuard>
      <section className="min-h-screen px-6 py-0">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Crear vehículo
          </button>
        </div>

        {/* Vehículos existentes */}
        <Cars editable key={refreshKey} />

        {/* Modal para crear vehículo */}
        <CrearVehiculoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onVehiculoCreado={handleVehiculoCreado}
        />
      </section>
    </AdminGuard>
  );
}
