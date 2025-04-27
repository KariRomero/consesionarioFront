'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGasPump,
  faGaugeHigh,
  faGear,
  faChevronRight,
  faChevronLeft,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import { prod_url } from '@/utils/routes';
import { Vehiculo } from '@/types/types';
import EditarVehiculoModal from '@/components/Admin/Vehiculos/EditarVehiculoModal';

interface Props {
  vehiculo: Vehiculo;
}

const VehiculoCardAdmin: React.FC<Props> = ({ vehiculo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const imageUrl = vehiculo.imagenes?.map((img) => img.url) || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrl.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${prod_url}/vehiculos/${vehiculo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`Vehículo "${vehiculo.modelo}" eliminado correctamente`);
      setShowDeleteModal(false);
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      toast.error('Error al eliminar el vehículo');
    }
  };

  return (
    <div
      className="relative rounded-lg shadow-lg overflow-hidden w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto transition-all duration-300 bg-white"
      style={{ minHeight: '400px' }}
    >
      {vehiculo.vendido && (
        <div className="absolute inset-0 bg-black bg-opacity-35 z-20 pointer-events-none rounded-lg" />
      )}

      {vehiculo.vendido && (
        <div className="absolute top-[110px] left-0 w-full bg-primary text-black text-center font-bold py-2 z-50">
          VENDIDO
        </div>
      )}

      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={imageUrl[currentImageIndex] || '/no-image.jpg'}
          alt={vehiculo.modelo}
          className="w-full h-full object-cover"
        />

        {imageUrl.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white p-1 rounded-full"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white p-1 rounded-full"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold mb-3">
          {vehiculo.brand?.nombre || 'Sin marca'} {vehiculo.modelo} - {vehiculo.year}
        </h2>
        <p className="mb-5">{vehiculo.descripcion || 'Sin descripción'}</p>
        <hr className="my-3 opacity-50" />
        <div className="flex items-center justify-between mb-5 text-sm space-x-3">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGaugeHigh} className="mr-2" />
            {vehiculo.kilometraje} KM
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGasPump} className="mr-2" />
            {vehiculo.combustible || 'N/A'}
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGear} className="mr-2" />
            {vehiculo.transmision || 'N/A'}
          </div>
        </div>
        <hr className="my-3 opacity-50" />
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold">
            {vehiculo.moneda === 'USD' ? 'USD$' : 'ARS$'} {Number(vehiculo.precio).toLocaleString('es-AR')}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="text-blue-600 font-semibold hover:underline flex items-center"
            >
              Editar
              <FontAwesomeIcon icon={faPenToSquare} className="ml-2" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-600 font-semibold hover:underline flex items-center"
            >
              Eliminar
              <FontAwesomeIcon icon={faTrash} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4">
              ¿Seguro que quieres eliminar {vehiculo.modelo}, año {vehiculo.year}?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
          )}

          {/* Modal editar */}
              {/* Modal editar */}
              {showEditModal && (
            <EditarVehiculoModal
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              vehiculoId={vehiculo.id}
              onVehiculoActualizado={() => window.location.reload()} // 🔥
            />
          )}
        </div> 
)}
    export default VehiculoCardAdmin;