'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { prod_url } from '@/utils/routes';
import ClienteUpdateForm from '@/components/Admin/clientes/ClienteUpdateForm';
import AsociarVehiculosClienteUpdate from '@/components/Admin/clientes/AsociarVehiculosClienteUpdate';
import ClienteDeleteModal from '@/components/Admin/clientes/ClienteDeleteModal';
import AdminGuard from '@/components/Admin/AdminGuard';

export default function EditarClientePage() {
  const { id } = useParams();
  const router = useRouter();
  const [cliente, setCliente] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const cargarCliente = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${prod_url}/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCliente(res.data);
    } catch (err) {
      toast.error('Error al cargar cliente');
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) cargarCliente();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${prod_url}/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Cliente eliminado');
      router.push('/admin/clientes');
    } catch (err) {
      toast.error('Error al eliminar cliente');
    }
  };

  if (!cliente) return <div className="p-6">Cargando...</div>;

  return (
    <AdminGuard>
      <div className="min-h-screen p-6 space-y-8 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Editar Cliente</h1>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-black hover:underline text-sm"
          >
            Eliminar cliente
          </button>
        </div>

        {/* Formulario editable */}
        <ClienteUpdateForm cliente={cliente} onUpdated={cargarCliente} />

        {/* Asociación de vehículos */}
        <AsociarVehiculosClienteUpdate clienteId={cliente.id} />

        {/* Modal de confirmación de eliminación */}
        <ClienteDeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          clienteNombre={cliente.nombre}
          clienteApellido={cliente.apellido}
        />
      </div>
    </AdminGuard>
  );
}