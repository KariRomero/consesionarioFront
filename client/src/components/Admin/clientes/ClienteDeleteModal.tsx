'use client';

import React from 'react';

interface ClienteDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clienteNombre: string;
  clienteApellido: string;
}

const ClienteDeleteModal: React.FC<ClienteDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  clienteNombre,
  clienteApellido,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">
          ¿Seguro que querés eliminar a {clienteNombre} {clienteApellido}?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClienteDeleteModal;