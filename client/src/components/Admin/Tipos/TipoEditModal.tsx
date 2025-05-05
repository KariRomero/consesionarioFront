"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { prod_url } from "@/utils/routes";

interface Tipo {
  id: string;
  nombre: string;
  ImageTipo?: string;
}

interface TipoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: Tipo;
  onUpdated: () => void;
}

const TipoEditModal: React.FC<TipoEditModalProps> = ({
  isOpen,
  onClose,
  tipo,
  onUpdated,
}) => {
  const [nombre, setNombre] = useState(tipo.nombre);
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | undefined>(
    tipo.ImageTipo
  );
  const [confirmarEliminarModal, setConfirmarEliminarModal] = useState(false);

  useEffect(() => {
    setNombre(tipo.nombre);
    setImagenPreview(tipo.ImageTipo);
    setImagen(null);
  }, [tipo]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("nombre", nombre);
    if (imagen) form.append("ImageTipo", imagen);

    try {
      await axios.put(`${prod_url}/tipos/${tipo.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Tipo actualizado");
      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el tipo");
    }
  };

  const handleDeleteImage = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${prod_url}/tipos/${tipo.id}/imagen-por-url`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { url: tipo.ImageTipo },
      });
      toast.success("Imagen eliminada");
      setImagenPreview(undefined);
      setImagen(null);
      onUpdated();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar imagen");
    } finally {
      setConfirmarEliminarModal(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" size="md">
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader className="text-lg font-bold">Editar Tipo</ModalHeader>
              <ModalBody className="space-y-4">
                <Input
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />

                {imagenPreview && (
                  <div className="relative w-fit mx-auto">
                    <Image
                      src={imagenPreview}
                      alt="imagen tipo"
                      width={160}
                      height={160}
                      className="object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setConfirmarEliminarModal(true)}
                      className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center"
                      title="Eliminar imagen"
                    >
                      ×
                    </button>
                  </div>
                )}

                <label className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center transition text-sm">
                  {imagenPreview ? "Reemplazar imagen" : "Agregar imagen"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImagen(file);
                        setImagenPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onClick={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Confirmación eliminar imagen */}
      <Modal isOpen={confirmarEliminarModal} onOpenChange={() => setConfirmarEliminarModal(false)}>
        <ModalContent>
          {(closeConfirm) => (
            <>
              <ModalHeader className="text-center font-bold">¿Eliminar esta imagen?</ModalHeader>
              <ModalBody>
                <div className="w-full flex justify-center items-center">
                  {imagenPreview && (
                    <img
                      src={imagenPreview}
                      alt="Preview"
                      className="w-40 h-40 object-contain rounded"
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" onClick={handleDeleteImage}>
                  Eliminar
                </Button>
                <Button variant="light" onClick={closeConfirm}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TipoEditModal;
