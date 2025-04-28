'use client';

import { useEffect, useState, Suspense } from 'react';
import AdminGuard from '@/components/Admin/AdminGuard';
import Cars from '@/components/Cars/Cars';
import CrearVehiculoModal from '@/components/Admin/Vehiculos/CrearVehiculoModal';
import { useSearchParams, useRouter } from 'next/navigation';

function VehiculosContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleVehiculoCreado = () => {
    setIsModalOpen(false);
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (searchParams.get('reload') === 'true') {
      setRefreshKey((prev) => prev + 1);
      const url = new URL(window.location.href);
      url.searchParams.delete('reload');
      router.replace(url.pathname);
    }
  }, [searchParams, router]);

  return (
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
  );
}

export default function Page() {
  return (
    <AdminGuard>
      {/* 🔥 Wrapp todo lo que usa useSearchParams dentro de Suspense */}
      <Suspense fallback={<div>Cargando vehículos...</div>}>
        <VehiculosContent />
      </Suspense>
    </AdminGuard>
  );
}
