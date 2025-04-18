'use client';

import AdminGuard from '@/components/Admin/AdminGuard';
import ClienteForm from '@/components/Admin/clientes/ClienteForm';

export default function CrearClientePage() {
  return (
    <AdminGuard>
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Crear Cliente</h1>
        <ClienteForm />
      </div>
    </AdminGuard>
  );
}