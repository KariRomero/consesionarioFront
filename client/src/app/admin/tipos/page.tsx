'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import AdminGuard from '@/components/Admin/AdminGuard';
import TipoEditModal from '@/components/Admin/Tipos/TipoEditModal';
import TipoCreateModal from '@/components/Admin/Tipos/TipoCreateModal';

interface Tipo {
  id: string;
  nombre: string;
  ImageTipo?: string;
}

export default function TiposPage() {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [selectedTipoToDelete, setSelectedTipoToDelete] = useState<Tipo | null>(null);
  const [selectedTipoToEdit, setSelectedTipoToEdit] = useState<Tipo | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchTipos = async () => {
    try {
      const res = await axios.get(`${prod_url}/tipos`);
      setTipos(res.data);
    } catch (error) {
      console.error('Error al cargar tipos:', error);
      toast.error('Error al cargar tipos');
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedTipoToDelete) return;
    try {
      await axios.delete(`${prod_url}/tipos/${selectedTipoToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Tipo eliminado con éxito');
      setSelectedTipoToDelete(null);
      fetchTipos();
    } catch (error: any) {
      console.error('Error al eliminar tipo:', error);
      toast.error(error?.response?.data?.message || 'Error al eliminar tipo');
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  return (
    <AdminGuard>
      <section className="min-h-screen p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tipos</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded-md transition"
          >
            <FontAwesomeIcon icon={faPlus} />
            Crear Tipo
          </button>
        </div>

        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
          {tipos.map((tipo) => (
            <div
              key={tipo.id}
              className="bg-white shadow-md rounded-lg w-64 p-4 flex flex-col items-center relative"
            >
              {tipo.ImageTipo && (
                <img
                  src={tipo.ImageTipo}
                  alt={tipo.nombre}
                  className="h-32 w-32 object-contain mb-2"
                />
              )}
              <p className="text-lg font-semibold text-center mb-2">{tipo.nombre}</p>
              <div className="absolute top-2 right-2 flex gap-3">
                <button
                  onClick={() => setSelectedTipoToEdit(tipo)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar tipo"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  onClick={() => setSelectedTipoToDelete(tipo)}
                  className="text-red-600 hover:text-red-800"
                  title="Eliminar tipo"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de creación */}
        {isCreateModalOpen && (
          <TipoCreateModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreated={() => {
              setIsCreateModalOpen(false);
              fetchTipos();
            }}
          />
        )}

        {/* Modal de edición */}
        {selectedTipoToEdit && (
          <TipoEditModal
            isOpen={!!selectedTipoToEdit}
            onClose={() => setSelectedTipoToEdit(null)}
            tipo={selectedTipoToEdit}
            onUpdated={() => {
              setSelectedTipoToEdit(null);
              fetchTipos();
            }}
          />
        )}

        {/* Modal de confirmación de eliminación */}
        {selectedTipoToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
              <h2 className="text-xl font-bold mb-4">
                ¿Seguro que querés eliminar el tipo <span className="text-red-600">{selectedTipoToDelete.nombre}</span>?
              </h2>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setSelectedTipoToDelete(null)}
                  className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </AdminGuard>
  );
}
