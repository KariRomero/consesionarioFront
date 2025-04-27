'use client';

import { useState } from 'react';
import AdminGuard from '@/components/Admin/AdminGuard';
import Cars from '@/components/Cars/Cars';
import CrearVehiculoModal from '@/components/Admin/Vehiculos/CrearVehiculoModal';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // 🔥 Nuevo

  const handleVehiculoCreado = () => {
    setIsModalOpen(false);
    setRefreshKey(prev => prev + 1); // 🔥 Cambiamos el key para forzar refresh
  };

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
        <Cars editable key={refreshKey} /> {/* 🔥 Agregamos key dinámico */}

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