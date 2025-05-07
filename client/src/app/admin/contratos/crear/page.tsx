'use client';

import { useState } from 'react';
import CrearContratoModal from '@/components/Admin/contratos/CrearContratoModal';

export default function CrearContratoPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleContratoCreado = () => {
    setIsOpen(false);
    // 🔄 Podés redirigir o refrescar si querés
    // router.push('/admin/contratos');
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contratos</h1>

      <button
        onClick={handleOpen}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear contrato
      </button>

      <CrearContratoModal
        isOpen={isOpen}
        onClose={handleClose}
        onContratoCreado={handleContratoCreado}
      />
    </section>
  );
}