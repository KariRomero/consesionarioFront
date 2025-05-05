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
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { prod_url } from "@/utils/routes";

interface TipoCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const TipoCreateModal: React.FC<TipoCreateModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("nombre", nombre);
    if (imagen) form.append("ImageTipo", imagen);

    try {
      await axios.post(`${prod_url}/tipos`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Tipo creado correctamente");
      onCreated();
      onClose();
      setNombre("");
      setImagen(null);
      setImagenPreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el tipo");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" size="md">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-lg font-bold">Crear Tipo</ModalHeader>
            <ModalBody className="space-y-4">
              <Input
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              {imagenPreview && (
                <div className="w-fit mx-auto">
                  <img
                    src={imagenPreview}
                    alt="Preview"
                    className="w-40 h-40 object-contain rounded"
                  />
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
              <Button variant="light" onClick={onClose}>Cancelar</Button>
              <Button color="primary" onClick={handleSubmit}>Crear</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TipoCreateModal;
