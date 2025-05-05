'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import AdminGuard from '@/components/Admin/AdminGuard';
import BrandEditModal from '@/components/Admin/marcas/BrandEditModal';
import BrandCreateModal from '@/components/Admin/marcas/BrandCreateModal';

interface Brand {
  id: string;
  nombre: string;
  ImageBrand?: string;
}

export default function MarcasPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrandToDelete, setSelectedBrandToDelete] = useState<Brand | null>(null);
  const [selectedBrandToEdit, setSelectedBrandToEdit] = useState<Brand | null>(null);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${prod_url}/brands`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBrands(res.data.brands);
    } catch (error) {
      console.error('Error al cargar marcas:', error);
      toast.error('Error al cargar marcas');
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedBrandToDelete) return;
    try {
      await axios.delete(`${prod_url}/brands/${selectedBrandToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Marca eliminada con éxito');
      setSelectedBrandToDelete(null);
      fetchBrands();
    } catch (error: any) {
      console.error('Error al eliminar marca:', error);
      toast.error(error?.response?.data?.message || 'Error al eliminar marca');
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <AdminGuard>
      <section className="min-h-screen p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Marcas</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded-md transition"
          >
            <FontAwesomeIcon icon={faPlus} />
            Crear Marca
          </button>
        </div>

        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">

          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white shadow-md rounded-lg w-64 p-4 flex flex-col items-center relative"
            >
              {brand.ImageBrand && (
                <img
                  src={brand.ImageBrand}
                  alt={brand.nombre}
                  className="h-32 w-32 object-contain mb-2"
                />
              )}
              <p className="text-lg font-semibold text-center mb-2">{brand.nombre}</p>
              <div className="absolute top-2 right-2 flex gap-3">
                <button
                  onClick={() => setSelectedBrandToEdit(brand)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar marca"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  onClick={() => setSelectedBrandToDelete(brand)}
                  className="text-red-600 hover:text-red-800"
                  title="Eliminar marca"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de creación de marca */}
        {isModalOpen && (
          <BrandCreateModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreated={() => {
              setIsModalOpen(false);
              fetchBrands();
            }}
          />
        )}

        {/* Modal de edición de marca */}
        {selectedBrandToEdit && (
          <BrandEditModal
            isOpen={!!selectedBrandToEdit}
            onClose={() => setSelectedBrandToEdit(null)}
            brand={selectedBrandToEdit}
            onUpdated={() => {
              setSelectedBrandToEdit(null);
              fetchBrands();
            }}
          />
        )}

        {/* Modal de confirmación de eliminación */}
        {selectedBrandToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
              <h2 className="text-xl font-bold mb-4">
                ¿Seguro que querés eliminar la marca <span className="text-red-600">{selectedBrandToDelete.nombre}</span>?
              </h2>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setSelectedBrandToDelete(null)}
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
