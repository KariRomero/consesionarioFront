'use client';

import CrearContratoForm from '@/components/Admin/contratos/CrearContratoForm';

export default function CrearContratoPage() {
  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crear contrato</h1>
      <CrearContratoForm />
    </section>
  );
}