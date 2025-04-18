'use client';

import { useState } from 'react';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  direccion?: string;
}

interface Props {
  cliente: Cliente;
  onUpdated?: () => void;
}

const ClienteUpdateForm: React.FC<Props> = ({ cliente, onUpdated }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    dni: cliente.dni,
    telefono: cliente.telefono,
    email: cliente.email,
    direccion: cliente.direccion || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${prod_url}/clientes/${cliente.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      toast.success('Cliente actualizado');
      
      // Redirige a /admin/clientes si todo salió bien
      router.push('/admin/clientes');
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      toast.error(msg || 'Error al actualizar cliente');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border p-2 rounded"
          required
        />
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          className="border p-2 rounded"
          required
        />
        <input
          name="dni"
          value={form.dni}
          onChange={handleChange}
          placeholder="DNI"
          className="border p-2 rounded"
          required
        />
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-black px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Guardar cambios
      </button>
    </form>
  );
};

export default ClienteUpdateForm;